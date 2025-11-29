from flask import Flask , make_response , jsonify
from auth import auth_bp
from extensions import db
from config import Config
from models import *
from flask_jwt_extended import jwt_required , JWTManager
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
CORS(app , supports_credentials=True , origins=["http://localhost:5173"])


jwt = JWTManager(app)
app.register_blueprint(auth_bp)
db.init_app(app)


with app.app_context():
    db.create_all()
    
@app.get('/home')
@jwt_required(locations=['cookies'])
def home():
    return jsonify({
        "message" : "Salut"
    }) , 200 
    
if __name__ == "__main__":
    app.run(debug=True)