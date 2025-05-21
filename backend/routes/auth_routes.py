from flask import Blueprint, request, jsonify, session
from flask_bcrypt import Bcrypt
from models import db, User

# Create a blueprint for authentication routes
auth = Blueprint("auth", __name__)
bcrypt = Bcrypt()


@auth.route("/register", methods=["POST"])
def register_user():
    email = request.json.get("email")
    password = request.json.get("password")

    user_exists = User.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"error": "user already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(email=email, password=hashed_password)

    db.session.add(new_user)

    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({"id": new_user.id, "email": new_user.email})


@auth.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()

    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorised"}), 401

    session["user_id"] = user.id

    return jsonify({"id": user.id, "email": user.email})


@auth.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


@auth.route("/me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorised"}), 401

    user = User.query.filter_by(id=user_id).first()

    return jsonify({"id": user.id, "email": user.email})
