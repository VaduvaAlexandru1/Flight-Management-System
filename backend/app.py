from flask import Flask , make_response , jsonify

app = Flask(__name__)

@app.get("/test")
def test():
    
    return make_response(jsonify({
        "message" : "salut"
    }) , 200)
    

@app.post("/login")
def login():
    pass

@app.post("/register")
def register():
    pass

@app.get("/home")
def home():
    pass

if __name__ == "__main__":
    app.run()