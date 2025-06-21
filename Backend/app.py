# /Backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import gitFetcher
from database import User, sign_in
import bublikchat # This now imports our clean module

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

# Load configuration
app.config["DEBUG"] = os.environ.get("FLASK_DEBUG", True)


# --- CHATBOT ROUTE (MODIFIED) ---
# This is the only section we are changing.
@app.route("/chatbot", methods=["POST"])
def chatbot_route():
    """
    Handles chatbot requests from the frontend, gets a real response,
    and returns it.
    """
    data = request.get_json()
    # Check for valid request body
    if not data or "message" not in data:
        return jsonify({"status": "error", "message": "Invalid request: no message provided"}), 400

    user_message = data["message"]

    # 1. Call the get_answer function from our bublikchat module
    ai_response = bublikchat.get_answer(user_message)

    # 2. Return the AI's actual response to the frontend
    # The frontend will look for the "answer" key in this JSON.
    return jsonify({"answer": ai_response})


# --- YOUR OTHER ROUTES (Unchanged) ---
@app.route("/git/<group_number>", methods=["GET"])
def get_git_data(group_number: int):
    return jsonify(results=gitFetcher.get_git_data_from_path(group_number))

@app.route("/register", methods=["POST"])
def register():
    """
    With form data name, academic_group, pbl_group_number, email, role, password, project_name
    register a user to the database
    """
    data = request.form
    try:
        user = User(
            name=data.get("name"),
            academic_group=data.get("academic_group"),
            pbl_group_number=data.get("pbl_group_number"),
            email=data.get("email"),
            role=data.get("role"),
            password=data.get("password"),
            project_name=data.get("project_name"),
        )

        success = sign_in(user)

        if success:
            return jsonify(
                {"status": "success", "message": "User registered successfully"}
            )
        else:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Registration failed - email or role already exists",
                    }
                ),
                400,
            )

    except Exception as e:
        return (
            jsonify({"status": "error", "message": f"Registration error: {str(e)}"}),
            500,
        )


if __name__ == "__main__":
    port = 5500
    bublikchat.init_convo_db()
    print(f"🚀 Flask server starting on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port)