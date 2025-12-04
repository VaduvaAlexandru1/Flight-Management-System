from flask import Flask , jsonify
from auth import auth_bp
from flights import flights_bp
from extensions import db
from config import Config
# from models import *
from flask_jwt_extended import jwt_required , JWTManager
from flask_cors import CORS
from wrappers import admin_required

app = Flask(__name__)
app.config.from_object(Config)
CORS(app , supports_credentials=True )


jwt = JWTManager(app)
app.register_blueprint(auth_bp)
app.register_blueprint(flights_bp)
db.init_app(app)

from models.user import User
from models.flight import Flight
from models.flight_details import FlightDetails

with app.app_context():
    db.create_all()
    
@app.get('/home')
@jwt_required(locations=['cookies'])
def home():
    return jsonify({
        "message" : "Salut"
    }) , 200 

@app.get('/admin-panel')
@admin_required
def admin_panel():
    return jsonify({
        "message" : "this is admin panel"
    }) , 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
