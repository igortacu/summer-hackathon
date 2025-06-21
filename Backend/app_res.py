from flask import Flask, request, jsonify
from flask_cors import CORS
import os
# from gitFetcher import get_git_data_from_path # Commented out as not provided
# from database import User, sign_in # Commented out as not provided
import bublikchat # Assuming bublikchat exists for init_convo_db
import bublikresources # Import your bublikproblem.py

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
        # Assuming bublikchat.chat_with_context exists and can be called without error
        try:
            bublikchat.chat_with_context(message)
        except Exception as e:
            print(f"Error in chatbot context: {e}")
            return jsonify({"status": "error", "message": "Chatbot processing failed."}), 500

    return jsonify({"status": "success", "message": "Chatbot integration not implemented yet."})


# Routes
@app.route("/api/ideas", methods=["POST"])
def get_ideas():
    """
    {"problem": "Describe your problem here"}
    """
    data = request.get_json()
    if not data or "problem" not in data:
        return jsonify({"status": "error", "message": "Problem description missing"}), 400
    try:
        ideas = bublikresources.propose_ideas(data["problem"])
        return jsonify({"ideas": ideas})
    except Exception as e:
        print(f"Error getting ideas: {e}")
        return jsonify({"status": "error", "message": f"Failed to generate ideas: {str(e)}"}), 500

@app.route("/api/tasks", methods=["POST"])
def get_tasks():
    """
    {"idea": "Describe your idea here"}
    """
    data = request.get_json()
    if not data or "idea" not in data:
        return jsonify({"status": "error", "message": "Idea description missing"}), 400
    try:
        tasks = bublikresources.distribute_tasks(data["idea"])
        return jsonify({"tasks": tasks})
    except Exception as e:
        print(f"Error getting tasks: {e}")
        return jsonify({"status": "error", "message": f"Failed to distribute tasks: {str(e)}"}), 500

@app.route("/api/resources", methods=["POST"])
def get_resources():
    """
    Expected input: {"idea": "Topic for resources"}
    Returns: {"resources": [{"title": "...", "link": "...", "description": "..."}, ...]}
    """
    data = request.get_json()
    if not data or "idea" not in data:
        return jsonify({"status": "error", "message": "Idea/topic for resources is missing"}), 400
    try:
        resources = bublikresources.get_resources(data["idea"]) # Call the updated get_resources
        # bublikproblem.get_resources now returns a list of dicts directly
        return jsonify({"resources": resources})
    except Exception as e:
        print(f"Error getting resources: {e}")
        return jsonify({"status": "error", "message": f"Failed to fetch resources: {str(e)}"}), 500

# Commented out git and auth routes as they are not directly relevant to the current problem
# and their dependencies (gitFetcher, database) were not provided.
# @app.route("/git/<group_number>", methods=["GET"])
# def get_git_data(group_number: int):
#     return jsonify(results=get_git_data_from_path(group_number))

# @app.route("/register", methods=["POST"])
# def register():
#     data = request.form
#     try:
#         user = User(
#             name=data.get("name"),
#             academic_group=data.get("academic_group"),
#             pbl_group_number=data.get("pbl_group_number"),
#             email=data.get("email"),
#             role=data.get("role"),
#             password=data.get("password"),
#             project_name=data.get("project_name"),
#         )
#         success = sign_in(user)
#         if success:
#             return jsonify({"status": "success", "message": "User registered successfully"})
#         else:
#             return jsonify({"status": "error", "message": "Registration failed - email or role already exists"}), 400
#     except Exception as e:
#         return jsonify({"status": "error", "message": f"Registration error: {str(e)}"}), 500


if __name__ == "__main__":
    port = 5500
    # Assuming bublikchat.init_convo_db() is a valid function to initialize database.
    # If not, comment this line out or replace with actual db init.
    try:
        bublikchat.init_convo_db()
    except Exception as e:
        print(f"Warning: Could not initialize conversation database: {e}")

    app.run(host="0.0.0.0", port=port) 