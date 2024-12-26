import sys
import json
import numpy as np
import spacy
import traceback

try:
    # Load the model
    nlp = spacy.load("en_core_web_md")

    def compute_similarity(user_answer, correct_answer):
        # Generate spacy docs
        user_doc = nlp(user_answer)
        correct_doc = nlp(correct_answer)

        # Check if either text has no vector (undefined)
        if user_doc.vector_norm == 0 or correct_doc.vector_norm == 0:
            return 0

        # Get vectors
        user_vector = user_doc.vector
        correct_vector = correct_doc.vector

        # Compute cosine similarity
        cosine_similarity = np.dot(user_vector, correct_vector) / (
            np.linalg.norm(user_vector) * np.linalg.norm(correct_vector)
        )

        # Convert similarity to a 0-100 scale
        rating = int((cosine_similarity + 1) * 50)
        return max(0, min(100, rating))

    # Get input arguments
    args = sys.argv[1:]
    if len(args) < 2:
        print(json.dumps({"error": "Missing arguments"}))
        sys.exit(1)

    user_answer = args[0]
    correct_answer = args[1]

    # Calculate rating
    rating = compute_similarity(user_answer, correct_answer)
    
    # Send result back to Node.js
    print(json.dumps({"rating": rating}))
    sys.exit(0)

except Exception as e:
    print(json.dumps({
        "error": str(e),
        "traceback": traceback.format_exc()
    }))
    sys.exit(1)