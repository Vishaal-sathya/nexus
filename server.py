from flask import Flask, request, jsonify
from flask_cors import CORS  # Allow cross-origin requests
import json 

app = Flask(__name__)
CORS(app)  # Enable CORS for React to communicate with Flask

with open("tech_category_mapping.json", "r") as file:
    DATA_JSON = json.load(file)

def get_unique_values(data):
    """Extracts only unique values from the JSON data."""
    unique_values = set()  # Using a set to store only unique values
    for values in data.values():  # Iterate over dictionary values
        unique_values.update(values)  # Add values to the set
    return list(unique_values)  # Convert back to a list




@app.route('/process', methods=['POST'])
def process_request():
    """Handles JSON requests from React app and sends JSON responses."""
    data = request.get_json()  # Get JSON data from React

    if not data or "message" not in data:
        return jsonify({"error": "Invalid request, 'message' key is missing"}), 400
    
    user_message = data["message"]
    print(f"Received message: {user_message}")
    if user_message =='/tech':
        unique_values = get_unique_values(DATA_JSON)

        response_data = {
            "status": "Message received",
            "originalMessage": user_message,
            "data": unique_values  # Send only unique values
        }
    else:

        # Dummy response
        response_data = {
            "status": "Message received",
            "originalMessage": user_message,
            "test":"working"
        }

    return jsonify(response_data), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8067, debug=True)  # Match React's port
