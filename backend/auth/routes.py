from . import auth_bp
from flask import jsonify

@auth_bp.get("/login")
def login():
    return jsonify({"message": "Login page"})

@auth_bp.get("/signup")
def signup():
    return jsonify({"message": "Signup page"})
