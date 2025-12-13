from . import auth_bp
from flask import jsonify, request
from flask_jwt_extended import create_access_token, set_access_cookies , unset_jwt_cookies , get_jwt_identity , jwt_required
from models.user import User
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os
load_dotenv()
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

    access_token = create_access_token(identity=str(user.id) , additional_claims={
        "is_admin" : user.is_admin
    })

    response = jsonify({"msg": "logged in"})
    set_access_cookies(response, access_token)
    return response, 200

# SIGNUP
@auth_bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}
    first_name = (data.get("firstName") or "").strip()
    last_name = (data.get("lastName") or "").strip()
    username = (data.get("username") or "").strip()
    password = (data.get("password") or "").strip()
    is_admin = (data.get("isAdmin") or False)
    if isinstance(is_admin, str):
        is_admin = is_admin.lower() == "true"

    if not username or not password or not first_name or not last_name:
        return jsonify({"message": "All fields are mandatory"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400

    # create new user
    user = User(first_name=first_name , last_name=last_name, username=username, password=generate_password_hash(password) , is_admin=is_admin )
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=str(user.id) , additional_claims={
        "is_admin" : False
    })

    response = jsonify({"msg": "signed up"})
    set_access_cookies(response, access_token)
    return response, 200


# LOGOUT
@auth_bp.post("/logout")
def logout():
    response = jsonify({"msg": "Logged out"})
    unset_jwt_cookies(response) 
    return response, 200

# BECOME ADMIN
@auth_bp.post("/become-admin")
@jwt_required(locations=["cookies"]) 
def become_admin():
    data = request.get_json(silent=True)
    password = (data.get("adminPassword") or "").strip()
    if password != os.getenv("ADMIN_PASSWORD"):
        return jsonify({"message" : "Incorect password"}) , 400
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    user.is_admin = True
    db.session.commit()
    
    new_token = create_access_token(
        identity=str(user.id),
        additional_claims={"is_admin" : True}
    )
    
    response = jsonify({"message" : "You are now admin!"})
    set_access_cookies(response , new_token)
    return response , 200 


# GET CURRENT USER
@auth_bp.get("/whoami")
@jwt_required(locations=["cookies"])
def whoami():
    user = get_user()
    if not user:
        return jsonify({
            "message" : "Somthing went wrong"
        }) , 400
    return jsonify({
        "user_id" : user.id,
        "first_name" : user.first_name,
        "last_name" : user.last_name,
        "is_admin" : user.is_admin
    }) , 200
    
@auth_bp.patch('/update-account')
@jwt_required(locations=["cookies"])
def update_account():
    user = get_user()
    
    data = request.get_json(silent=True)
    
    if not data:
        return jsonify({"message": "No data provided"}), 400
    
    try:
        if "first_name" in data:
            user.first_name = data["first_name"]
        if "last_name" in data:
            user.last_name = data["last_name"]
        if "username" in data:
            if User.query.filter_by(username=data["username"]).first():
                return jsonify({"message": "User already exists"}), 400
            user.first_name = data["username"]

    except Exception as e:
        pass
    
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    return user

@auth_bp.delete('/delete-account')
@jwt_required(locations=["cookies"])
def delete_account():
    user = get_user()
    
    db.session.delete(user)
    db.session.commit()
    
    return {"message": "User deleted successfully"}, 200