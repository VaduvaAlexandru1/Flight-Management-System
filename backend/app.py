from flask import Flask , make_response , jsonify
from auth import auth_bp
from extensions import db
from config import Config
from models import *
from flask_jwt_extended import jwt_required , JWTManager

app = Flask(__name__)

app.register_blueprint(auth_bp)
app.config.from_object(Config)

db.init_app(app)

jwt = JWTManager(app)

with app.app_context():
    db.create_all()
    
@app.get('/home')
@jwt_required()
def home():
    return jsonify({
        "message" : "Salut"
    }) , 200
    
if __name__ == "__main__":
    app.run(debug=True)