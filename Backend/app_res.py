from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# External modules (ensure these exist and are importable)
import bublikchat
import bublikresources

app = Flask(__name__)
CORS(app)

# Load configuration
app.config["DEBUG"] = os.environ.get("FLASK_DEBUG", True)


@app.route("/chatbot", methods=["POST"])
def chatbot():
    """
    Placeholder for chatbot integration.
    Handles incoming chatbot messages.
    """
    payload = request.get_json()
    if not payload:
        return jsonify({"status": "error", "message": "Invalid JSON payload"}), 400

    message = payload.get("message", "")
    if not message:
        return jsonify({"status": "error", "message": "No message provided"}), 400

    try:
        # This should process the message and update context or return a reply
        bublikchat.chat_with_context(message)
    except Exception as e:
        app.logger.error(f"Chatbot processing failed: {e}")
        return (
            jsonify({"status": "error", "message": "Chatbot processing failed."}),
            500,
        )

    return jsonify(
        {
            "status": "success",
            "message": "Chatbot integration not implemented yet.",
        }
    )


@app.route("/api/ideas", methods=["POST"])
def get_ideas():
    """
    Generate solution ideas for a given problem.
    Expects JSON: { "problem": "Describe your problem here" }
    Returns: { "ideas": [...] }
    """
    payload = request.get_json()
    if not payload or "problem" not in payload:
        return jsonify({"status": "error", "message": "Problem description missing"}), 400

    try:
        ideas = bublikresources.propose_ideas(payload["problem"])
        return jsonify({"ideas": ideas})
    except Exception as e:
        app.logger.error(f"Error generating ideas: {e}")
        return (
            jsonify(
                {
                    "status": "error",
                    "message": f"Failed to generate ideas: {e}",
                }
            ),
            500,
        )


@app.route("/api/tasks", methods=["POST"])
def get_tasks():
    """
    Distribute tasks for a chosen idea.
    Expects JSON: { "idea": "Describe your idea here" }
    Returns: { "tasks": [...] }
    """
    payload = request.get_json()
    if not payload or "idea" not in payload:
        return jsonify({"status": "error", "message": "Idea description missing"}), 400

    try:
        tasks = bublikresources.distribute_tasks(payload["idea"])
        return jsonify({"tasks": tasks})
    except Exception as e:
        app.logger.error(f"Error distributing tasks: {e}")
        return (
            jsonify(
                {
                    "status": "error",
                    "message": f"Failed to distribute tasks: {e}",
                }
            ),
            500,
        )


@app.route("/api/resources", methods=["POST"])
def get_resources():
    """
    Fetch literature/resources recommendations for a given topic.
    Expects JSON: { "idea": "Topic for resources" }
    Returns: { "resources": [{ "title": ..., "link": ..., "description": ... }, ...] }
    """
    payload = request.get_json()
    if not payload or "idea" not in payload:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "Topic for resources is missing",
                }
            ),
            400,
        )

    try:
        resources = bublikresources.get_resources(payload["idea"])
        return jsonify({"resources": resources})
    except Exception as e:
        app.logger.error(f"Error fetching resources: {e}")
        return (
            jsonify(
                {
                    "status": "error",
                    "message": f"Failed to fetch resources: {e}",
                }
            ),
            500,
        )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5500)))
