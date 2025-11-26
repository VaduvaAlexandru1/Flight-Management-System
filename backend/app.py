from flask import Flask , make_response , jsonify
from auth import auth_bp

app = Flask(__name__)

app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run()