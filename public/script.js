document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById("question");
    const questionImage = document.getElementById("question-image");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit-btn");
    const feedbackElement = document.getElementById("feedback");
    const ratingSlider = document.getElementById("rating-slider");
    const ratingValue = document.getElementById("rating-value");
    const currentQuestionSpan = document.getElementById("current-question");
    const progressFill = document.querySelector(".progress-fill");
    const contentWrapper = document.querySelector(".content-wrapper");
  
    let currentQuestionIndex = 0;
    const questions = [
      {
        image: "/images/q1.png",
        correctAnswer: "Paris",
        matchAnswer: "Paris (the capital of France)"
      },
      {
        image: "/images/q2.png",
        correctAnswer: "ISSpresso",
        matchAnswer: "ISSpresso (the first espresso machine for International Space Station)"
      },
      {
        image: "/images/q3.png",
        correctAnswer: "Vivo",
        matchAnswer: "Vivo (a Chinese mobile company)"
      }
    ];


    function createSuccessPage() {
        return `
            <div class="success-page">
                <div class="success-icon">🏆</div>
                <h2 class="success-title">Congratulations! 🎉</h2>
                <p class="success-message">You've successfully completed all questions!</p>
                <div class="success-buttons">
                    <button class="share-button">
                        <span class="button-icon">📤</span>
                        Share
                    </button>
                </div>
            </div>
        `;
    }


    

    function setupEventListeners() {
        // Handle Enter key press
        answerInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && !submitButton.disabled) {
                submitButton.click();
            }
        });

        submitButton.addEventListener("click", handleSubmit);
    }
  
    function updateProgress() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressFill.style.width = `${progress}%`;
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
    }
  
    function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.classList.toggle("loading", isLoading);
    }
  
    function checkAnswer(userAnswer, correctAnswer) {
        return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    }
  
    async function getRating(userAnswer, matchAnswer, endpoint) {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userAnswer, correctAnswer: matchAnswer }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.rating;
    }
  
    function updateRatingDisplay(pythonRating, groqRating) {
        const combinedRating = Math.round((pythonRating + groqRating) / 2);

        const existingFills = ratingSlider.querySelectorAll('.rating-fill');
        existingFills.forEach(fill => fill.remove());

        const createFill = (rating, className) => {
            const fill = document.createElement('div');
            fill.className = `rating-fill ${className}`;
            fill.style.width = `${rating}%`;
            fill.style.opacity = '0.5';
            return fill;
        };

        const pythonFill = createFill(pythonRating, 'rating-python');
        const groqFill = createFill(groqRating, 'rating-groq');
        const combinedFill = document.createElement('div');
        combinedFill.className = `rating-fill rating-combined ${getRatingClass(combinedRating)}`;
        combinedFill.style.width = `${combinedRating}%`;

        ratingSlider.appendChild(pythonFill);
        ratingSlider.appendChild(groqFill);
        ratingSlider.appendChild(combinedFill);

        ratingValue.innerHTML = `
            <span class="rating-detail">SpaCy: ${pythonRating}%</span>
            <span class="rating-detail">Llama: ${groqRating}%</span>
            <span class="rating-combined">Combined: ${combinedRating}%</span>
        `;
    }
  
    function getRatingClass(rating) {
        if (rating < 40) return 'rating-low';
        if (rating < 70) return 'rating-medium';
        return 'rating-high';
    }
  
    function showSuccessPage() {
        contentWrapper.innerHTML = createSuccessPage();
        progressFill.style.width = "0%";
        
        // Add event listener to share button only
        const shareButton = document.querySelector('.share-button');
        shareButton.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Mock Cryptex Quiz',
                    text: 'I just completed the Mock Cryptex Quiz! Try it yourself!'
                }).catch(console.error);
            }
        });
    }
  
    function moveToNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            questionImage.src = questions[currentQuestionIndex].image;
            answerInput.value = "";
            feedbackElement.textContent = "";
            updateRatingDisplay(0, 0);
            updateProgress();
        } else {
            showSuccessPage();
        }
    }
  
    async function handleSubmit() {
        const userAnswer = answerInput.value.trim();
        const currentQuestion = questions[currentQuestionIndex];

        if (!userAnswer) {
            feedbackElement.textContent = "Please enter an answer.";
            return;
        }

        setLoading(true);
        feedbackElement.textContent = "Getting ratings...";

        try {
            // Get ratings from both endpoints
            const [pythonRating, groqRating] = await Promise.all([
                getRating(userAnswer, currentQuestion.matchAnswer, "http://localhost:3000/api/spacy-rate"),
                getRating(userAnswer, currentQuestion.matchAnswer, "http://localhost:3000/api/groq-rate")
            ]);

            updateRatingDisplay(pythonRating, groqRating);
            
            if (checkAnswer(userAnswer, currentQuestion.correctAnswer)) {
                feedbackElement.textContent = "Correct! Moving to the next question...";
                setTimeout(moveToNextQuestion, 1500);
            } else {
                feedbackElement.textContent = "Not quite right. Try again!";
            }

        } catch (error) {
            feedbackElement.textContent = `Error: ${error.message}`;
        } finally {
            setLoading(false);
        }
    }

    // Initial setup
    questionImage.src = questions[0].image;
    updateProgress();
    setupEventListeners();
});