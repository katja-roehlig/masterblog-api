from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

POSTS = [
    {"id": 1, "title": "First post", "content": "This is the first post."},
    {"id": 2, "title": "Second post", "content": "This is the second post."},
]


def validate_post_data(data):
    error_list = []
    if "title" not in data or data["title"].strip() == "":
        error_list.append("title")
    if "content" not in data or data["content"].strip() == "":
        error_list.append("content")
    return error_list


def find_post_by_id(id):
    for post in POSTS:
        if post["id"] == id:
            return post
    return None


@app.route("/api/posts", methods=["GET"])
def get_posts():
    return jsonify(POSTS)


@app.route("/api/posts", methods=["POST"])
def create_posts():

    user_input = request.get_json()
    error_list = validate_post_data(user_input)
    if error_list:
        return (
            jsonify({"Error": f"Missing required data: {", ".join(error_list)}"}),
            400,
        )
    new_post = {
        "id": (max(post["id"] for post in POSTS)) + 1,
        "title": user_input["title"],
        "content": user_input["content"],
    }
    POSTS.append(new_post)
    return jsonify(new_post), 201


@app.route("/api/posts/<int:id>", methods=["DELETE"])
def delete_post(id):
    delete_post = find_post_by_id(id)
    if not delete_post:
        return (
            jsonify({"Error": f"Post with id {id} was not found. Please check again"}),
            404,
        )
    POSTS.remove(delete_post)
    return (
        jsonify({"message": f"Post with id {id} has been deleted successfully."}),
        200,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
