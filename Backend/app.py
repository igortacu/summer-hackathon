from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from gitFetcher import get_git_data_from_path
from database import User, sign_in  
import bublikchat
import bublikproblem
import database

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

# Load configuration
app.config["DEBUG"] = os.environ.get("FLASK_DEBUG", True)

# TODO: CHATBOT INTEGRATION

@app.route("/chatbot", methods=["POST"])
def chatbot():
    """
    Placeholder for chatbot integration.
    This route can be used to handle chatbot requests.
    """
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "Invalid JSON payload"}), 400

    message = data.get("message", "")
    if not message:
        return jsonify({"status": "error", "message": "No message provided"}), 400
    else:
        bublikchat.chat_with_context(message)

    return jsonify({"status": "success", "message": "Chatbot integration not implemented yet."})


# Routes
@app.route("/api/ideas", methods=["POST"])
def get_ideas():
    """
    {"problem": "Describe your problem here"}
    """
    data = request.get_json()
    ideas = bublikproblem.propose_ideas(data["problem"])
    return jsonify({"ideas": ideas})

@app.route("/api/tasks", methods=["POST"])
def get_tasks():
    """
    {"idea": "Describe your idea here"}
    """
    data = request.get_json()
    tasks = bublikproblem.distribute_tasks(data["idea"])
    return jsonify({"tasks": tasks})

@app.route("/api/resources", methods=["POST"]) 
#! Not sure if we will use it 
def get_resources():
    data = request.get_json()
    resources = bublikproblem.get_resources(data["idea"])
    return jsonify({"resources": resources})

@app.route("/git/<group_number>", methods=["GET"])
def get_git_data(group_number: int):
    return jsonify(results=get_git_data_from_path(group_number))


# Put for only method of post and get the form data
@app.route("/register", methods=["POST"])
def register():
    """
    With form data name, academic_group, pbl_group_number, email, role, password, project_name
    register a user to the database
    """
    data = request.form

    # Create a User object from the form data
    try:
        user = User(
            name=data.get("name"),
            academic_group=data.get("academic_group"),
            pbl_group_number=data.get("pbl_group_number"),
            email=data.get("email"),
            role=data.get("role"),
            password=data.get("password"),
            project_name=data.get("project_name"),
            github_url=data.get("github_url", None), 
        )

        # Register the user with the database
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
    database.init_convo_db()

    app.run(host="0.0.0.0", port=port)
