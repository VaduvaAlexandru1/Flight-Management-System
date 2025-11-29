from . import auth_bp
from flask import jsonify, request
from flask_jwt_extended import create_access_token, set_access_cookies , unset_jwt_cookies 
from models.user import User
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

# LOGIN
@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = (data.get("password") or "").strip()

    if not username or not password:
        return jsonify({"message": "Username and password are mandatory"}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "User or password incorrect"}), 400

    access_token = create_access_token(identity=str(user.id))

    response = jsonify({"msg": "logged in"})
    set_access_cookies(response, access_token)
    return response, 200

# SIGNUP
@auth_bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = (data.get("password") or "").strip()

    if not username or not password:
        return jsonify({"message": "Username and password are mandatory"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400

    # create new user
    user = User(username=username, password=generate_password_hash(password))
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=str(user.id))

    response = jsonify({"msg": "signed up"})
    set_access_cookies(response, access_token)
    return response, 200

# LOGOUT
@auth_bp.post("/logout")
def logout():
    response = jsonify({"msg": "Logged out"})
    unset_jwt_cookies(response) 
    return response, 200
