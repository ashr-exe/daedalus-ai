# **Daedalus-AI** 🧠🚀  

Unleash the power of AI with **Daedalus-AI**, a futuristic, image-based quiz platform that blends advanced artificial intelligence, dynamic interactivity, and sleek design. Designed for innovators and learners, this app delivers engaging experiences powered by cutting-edge technologies.

---

## **🚨 Features at a Glance**  
- **⚡ AI-Powered Scoring**: Leverages SpaCy and Llama APIs to rate user responses with precision.  
- **🎯 Interactive Quizzes**: Dive into visually rich questions and unlock your knowledge.  
- **📊 Real-Time Feedback**: Intuitive sliders and progress bars provide instant, actionable insights.  
- **🌐 Cross-Platform Compatibility**: Enjoy the same high-tech experience on any device.  
- **✨ Shareable Results**: Celebrate your success and challenge others to beat your score.

---

## **💻 Tech Stack**  

| **Technology**   | **Role**                               |
|-------------------|---------------------------------------|
| **HTML/CSS**      | Elegant and responsive UI design      |
| **JavaScript**    | Client-side interactivity and logic   |
| **Node.js**       | Robust backend server and API routing |
| **Python (SpaCy)**| Advanced answer evaluation           |
| **Llama API**      | AI-assisted contextual scoring       |

---

## **🔧 How It Works**  
1. **Image-Based Questions**:  
   Each question is paired with a visually stimulating image to challenge the user's observational and knowledge skills.

2. **AI Evaluation**:  
   - **SpaCy**: Measures semantic similarity between the user's answer and the correct answer.  
   - **Llama API**: Uses advanced contextual understanding using LLMs to provide a refined rating.  

3. **Dynamic Feedback**:  
   Ratings from both systems are combined, visualized, and displayed with an intuitive progress bar.

4. **Quiz Progression**:  
   Users proceed to the next question upon submitting correct answers or after retrying.

---

## **🚀 Quick Start**  

### 1. Clone the Repository:
```bash
git clone https://github.com/yourusername/daedalus-ai.git
cd daedalus-ai
```

### 2. Install Dependencies:
#### Backend:
```bash
npm install
pip install -r requirements.txt
```
#### Frontend:
```bash
npm run build
```

### 3. Set Up Environment Variables:
Create a `.env` file in the root directory with the following:
```env
GROQ_API_KEY=your-groq-api-key
PORT=3000
```

### 4. Start the Application:
```bash
npm start
```

### 5. Access the App:
Visit `http://localhost:3000` in your browser.

---

## **📂 Project Structure**  

```plaintext
daedalus-ai/
├── public/               # Static assets (images, stylesheets, etc.)
├── server.js             # Node.js server for API and routing
├── script.js             # Frontend logic
├── rate_answer.py        # Python-based AI scoring logic
├── .gitignore            # Ignored files
├── package.json          # Node.js dependencies
├── requirements.txt      # Python dependencies           
└── README.md             # Project documentation
```

---

## **💡 Future Enhancements**  
- 🌍 User signup/login and leaderboard.  
- 🧩 User-customizable quizzes and question pools.  
- 📈 AI-driven insights and analytics for quiz performance.  

---

## **👨‍💻 Contributing**  
We welcome contributions from developers worldwide! Feel free to fork this repository, create a feature branch, and submit a pull request.  

---

## **📜 License**  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Let me know if you want to include more interactive elements or sections, such as GIFs, screenshots, or API documentation!
