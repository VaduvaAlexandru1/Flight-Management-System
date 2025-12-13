import os
from dotenv import load_dotenv

load_dotenv()

USE_DOCKER_DB = os.getenv("USE_DOCKER_DB", "true") == "true"

POSTGRES_HOST = os.getenv("DOCKER_POSTGRES_HOST") if USE_DOCKER_DB else os.getenv("LOCAL_POSTGRES_HOST")
POSTGRES_PORT = os.getenv("DOCKER_POSTGRES_PORT") if USE_DOCKER_DB else os.getenv("LOCAL_POSTGRES_PORT")

class Config:
    SQLALCHEMY_DATABASE_URI = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{POSTGRES_HOST}:{POSTGRES_PORT}/{os.getenv('POSTGRES_DB')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_SECURE = False
    JWT_ACCESS_COOKIE_PATH = "/"
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_COOKIE_SAMESITE = "Lax"
    
    # DB_URL = `postgresql://${procces.env.DB_USERNAME}:${procces.env.DB_PASWORD}`
