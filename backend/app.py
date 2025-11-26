from flask import Flask , make_response , jsonify

app = Flask(__name__)

@app.get("/api/test")
def test():
    
    return make_response(jsonify({
        "message" : "salut"
    }) , 200)

if __name__ == "__main__":
    app.run()