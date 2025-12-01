from flask import Blueprint

flights_bp = Blueprint("flights" , __name__ , url_prefix="/flights")
from . import routes