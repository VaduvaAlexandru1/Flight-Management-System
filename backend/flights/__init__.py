from flask import Blueprint
from flask_cors import CORS

flights_bp = Blueprint("flights" , __name__ , url_prefix="/flights")
CORS(flights_bp)
from . import routes