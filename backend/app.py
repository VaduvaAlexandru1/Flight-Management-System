from flask import Flask , make_response , jsonify
from auth import auth_bp
from .extensions import db
from .config import Config
app = Flask(__name__)

app.register_blueprint(auth_bp)
app.config.from_object(Config)

db.init_app()

if __name__ == "__main__":
    app.run()