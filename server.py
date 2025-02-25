from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import re

from news import fetch_and_update_news
from knowledge_base import create_knowledge_base
from chatbot import chat_with_bot

app = Flask(__name__)
CORS(app)

# Load domain-to-skills mapping
with open("tech_category_mapping.json", "r") as file:
    DATA_JSON = json.load(file)

# Keywords for skills and news detection
INTENT_KEYWORDS = ["skills", "technologies", "tech stack", "popular", "trending", "latest", "current", 'techstack']
NEWS_KEYWORDS = ["news", "updates", "latest news", "trending news", "current affairs"]

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure upload folder exists
PDF_PATH = os.path.join(UPLOAD_FOLDER, "base.pdf")


def detect_intent(user_message):
    """Detect if the user is asking about tech skills."""
    user_message = user_message.lower()
    return any(keyword in user_message for keyword in INTENT_KEYWORDS)


def detect_news_intent(user_message):
    """Detect if the user is asking about news."""
    user_message = user_message.lower()
    return any(keyword in user_message for keyword in NEWS_KEYWORDS)


# def extract_domain(user_message):
#     user_message = user_message.lower()
#     """Extracts the domain (e.g., Blockchain, AI) from user message."""
#     for domain in DATA_JSON.keys():
#         if re.search(rf"\b{re.escape(domain.lower())}\b", user_message):
#             return domain
#     return None
def extract_domain(user_message):
    user_message = user_message.lower()
    """Extracts the domain (e.g., 'Artificial Intelligence') by searching the keys in DATA_JSON."""
    for keyword, domain in DATA_JSON.items():
        if re.search(rf"\b{re.escape(keyword.lower())}\b", user_message):
            return domain
    return None


@app.route('/process', methods=['POST'])
def process_request():
    
    """Handles PDF upload, extracts knowledge, and answers user query."""

    if "file" in request.files:
        print(1)
        file = request.files["file"]
        json_data = request.form.get("json")  # Extract JSON as string

        if file.filename.endswith(".pdf"):
            file.save(PDF_PATH)  # Save the file
            
            # Convert JSON string to dictionary
            try:
                json_data = json.loads(json_data) if json_data else {}
            except json.JSONDecodeError:
                return jsonify({"error": "Invalid JSON format"}), 400

            # Extract text (knowledge base) from PDF
            knowledge_base_message = create_knowledge_base()

            # Extract user message and send to chatbot
            user_message = json_data.get("message", "Summarize the document.")  # Default query
            
            bot_response = chat_with_bot(user_message, use_knowledge_base=True)
            print('#########################################################')
            print(bot_response)

            return jsonify({
                "message": "PDF uploaded successfully",
                "knowledge_base_status": knowledge_base_message,
                "data": str(bot_response).replace("**", " ").replace("*", " ")  # Chatbot response using knowledge base
            }), 200

        return jsonify({"error": "Invalid file format. Only PDFs are allowed"}), 400

    # **Handle JSON message requests**
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "Invalid request, 'message' key is missing"}), 400

    user_message = data["message"]
    print(f"Received message: {user_message}")

    # Handle request for tech skills
    if user_message.strip() == '/tech':
        print(2)
        unique_values = set(DATA_JSON.values())
        return jsonify({
            "status": "Message received",
            "originalMessage": user_message,
            "data": list(unique_values)
        }), 200

    elif detect_news_intent(user_message) or detect_intent(user_message):
        print(3)
        domain = extract_domain(user_message)
        if domain:
            
            news_articles = fetch_and_update_news(domain)
            return jsonify({
                    "status": "Message received",
                    "originalMessage": user_message,
                    "data": {
                        "domain": domain,
                        "news": news_articles
                    }
                }), 200
        else:
            return jsonify({
                "status": "Message received",
                "originalMessage": user_message,
                "message": "I couldn't find the domain you're asking about."
            }), 200

    

    # **Chatbot response for other queries**
    print(5)
    bot_response = chat_with_bot(user_message, use_knowledge_base=False)
    return jsonify({
        "status": "Message received",
        "data": str(bot_response).replace("**", " ")
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8067, debug=True)
    # knowledge_base_message = create_knowledge_base()
    # #         # Extract user message and send to chatbot
    # user_message = "Summarize the document."  # Default query
    # bot_response = chat_with_bot(user_message, use_knowledge_base=True)
    # print(bot_response)
    
