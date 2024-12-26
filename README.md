# **Daedalus-AI** 🧠🚀  

A modern image-based quiz platform powered by AI, combining SpaCy's semantic analysis and Groq's language models to provide intelligent answer evaluation. Experience an engaging quiz interface with real-time AI-powered feedback.

## **✨ Key Features**  
- **🤖 Dual AI Scoring System**: Combines SpaCy's semantic analysis with Groq's LLM capabilities
- **📊 Real-Time Visual Feedback**: Dynamic rating sliders with color-coded feedback
- **🎯 Interactive Quiz Interface**: Clean, responsive design with progress tracking
- **🌐 Modern Web Stack**: Built with Node.js, Express, and vanilla JavaScript
- **📱 Mobile-Friendly**: Responsive design that works on all devices

## **🛠️ Technical Stack**

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **AI/ML**: 
  - SpaCy (Python) for semantic similarity analysis
  - Groq API with llama3-8b-8192 model for contextual understanding
- **APIs**: REST endpoints for answer evaluation

## **⚡ Quick Start**

### Prerequisites
- Node.js (v14 or higher)
- Python (3.8 or higher)
- SpaCy with English model
- Groq API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/daedalus-ai.git
cd daedalus-ai
```

2. **Install Node.js dependencies**
```bash
npm install
```

3. **Install Python dependencies**
```bash
pip install spacy numpy
python -m spacy download en_core_web_md
```

4. **Configure environment**
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your-groq-api-key
PORT=3000
```

5. **Add quiz images**
Place your quiz images in the `public/images` directory:
- q1.png
- q2.png
- q3.png

6. **Start the server**
```bash
npm start
```

7. **Access the application**
Open `http://localhost:3000` in your browser

## **📁 Project Structure**
```
daedalus-ai/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Styling
│   ├── script.js       # Frontend logic
│   └── images/         # Quiz images (add your own)
├── server.js           # Express server & API endpoints
├── rate_answer.py      # SpaCy answer evaluation
├── .env               # Environment variables
├── .gitignore         # Git ignore rules
├── package.json       # Node.js dependencies
└── README.md          # Documentation
```

## **🔧 Configuration**

### Environment Variables
- `PORT`: Server port (default: 3000)
- `GROQ_API_KEY`: Your Groq API key (required)

### Quiz Questions
Questions are configured in `public/script.js`. Each question requires:
- Image path
- Correct answer
- Match answer (expanded version for AI evaluation)

## **💡 How It Works**

1. **Answer Submission**:
   - User submits an answer
   - Answer is evaluated by both SpaCy and Groq API

2. **Dual AI Evaluation**:
   - SpaCy: Measures semantic similarity
   - Groq: Evaluates contextual understanding

3. **Rating Visualization**:
   - Individual ratings from both systems
   - Combined rating with color-coded feedback
   - Progress tracking across questions

## **🌐 Browser Compatibility**
- Chrome (v90+)
- Firefox (v88+)
- Safari (v14+)
- Edge (v90+)

## **⚠️ Troubleshooting**

**SpaCy Model Error**
```bash
python -m spacy download en_core_web_md
```

**Groq API Issues**
- Verify API key in `.env`
- Check Groq service status
- Ensure proper request format

## **🤝 Contributing**

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## **📄 License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **🙏 Acknowledgments**

- SpaCy for their excellent NLP library
- Groq for their powerful LLM API
- The open-source community

---

**Note**: This is a demonstration project. In a production environment, you would want to add:
- User authentication
- Rate limiting
- Error logging
- Testing suite
- CI/CD pipeline
