require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const Groq = require("groq-sdk");
const { PythonShell } = require("python-shell");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Groq endpoint
app.post("/api/groq-rate", async (req, res) => {
  const { userAnswer, correctAnswer } = req.body;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an AI who has a multi-dimensional vector representation of all the words and terms in the English langugage. Rate the answer from 0 to 100, where 0 means completely unrelated and 100 means exact match. Only provide the rating as an integer."
        },
        {
          role: "user",
          content: `Rate the following answer from 0 to 100:\nCorrect Answer: ${correctAnswer}\nUser Answer: ${userAnswer}. Only respond with a number between 0 and 100.`
        }
      ],
      model: "llama3-8b-8192",
    });

    const rating = parseInt(response.choices[0]?.message?.content, 10);
    if (isNaN(rating)) {
      return res.status(400).json({ error: "Invalid rating returned from the Groq API" });
    }

    res.json({ rating });
  } catch (error) {
    console.error("Error in /api/groq-rate:", error);
    res.status(500).json({ error: "Failed to rate the answer" });
  }
});

// SpaCy endpoint
app.post("/api/spacy-rate", (req, res) => {
  const { userAnswer, correctAnswer } = req.body;

  if (!userAnswer || !correctAnswer) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const options = {
    mode: "json",
    pythonPath: "python",
    pythonOptions: ["-u"],
    scriptPath: __dirname,
    args: [userAnswer, correctAnswer]
  };

  let pyshell = new PythonShell("rate_answer.py", options);
  
  const timeout = setTimeout(() => {
    pyshell.terminate();
    res.status(408).json({ error: "Python process timeout" });
  }, 15000);

  pyshell.on('message', function (message) {
    clearTimeout(timeout);
    res.json(message);
  });

  pyshell.on('error', function (error) {
    clearTimeout(timeout);
    console.error('Python error:', error);
    res.status(500).json({ error: "Python process error" });
  });

  pyshell.end((err) => {
    if (err) {
      clearTimeout(timeout);
      console.error('Python end error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Process end error" });
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));