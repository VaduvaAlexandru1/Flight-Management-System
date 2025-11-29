from . import auth_bp
from flask import jsonify , request , make_response
from flask_jwt_extended import create_access_token
from models.user import User
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or '').strip()
    password = (data.get("password") or '').strip()
    
    if not username or not password:
        return make_response(jsonify(
            {
                "message" : "Username and password are mandatory"
            }
        ), 400)
    
    user = User.query.filter_by(username=username).first()
    
    if not user or not check_password_hash(user.password, password):
        return make_response(jsonify(
            {
                "message" : "User or password incorrect"
            }
        ) , 400)
    
    
    
    acces_token = create_access_token(identity=str(user.id) , additional_claims={"userID" : str(user.id)})
    
    return make_response(jsonify({
        "acces_token" : f'{acces_token}',
        "userID" : f'{user.id}'
    }) , 200)

@auth_bp.post("/signup")
def signup():
    
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or '').strip()
    password = (data.get("password") or '').strip()
    
    if not username or not password:
        return make_response(jsonify(
            {
                "message" : "Username and password are mandatory"
            }
        ), 400)
    
    user = User.query.filter_by(username=username).first()
    if user:
        return make_response(jsonify({
            "message" : "User already exists"
        }) , 400)
    
    user = User(username=username , password=generate_password_hash(password))
    
    db.session.add(user)
    db.session.commit()
    
    acces_token = create_access_token(identity=str(user.id) , additional_claims={"userID" : str(user.id)})
    
    return make_response(jsonify({
        "acces_token" : f'{acces_token}',
        "userID" : f'{user.id}'
    }) , 200)
