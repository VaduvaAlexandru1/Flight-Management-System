from extensions import db

class User(db.Model):
    
    __tablename__ = "users"
    
    id = db.Column(db.Integer ,primary_key=True)
    first_name = db.Column(db.String(100) , unique=False , nullable=False)
    last_name = db.Column(db.String(100) , unique=False , nullable=False)
    username = db.Column(db.String(100) , unique=True , nullable=False)
    password = db.Column(db.String(255) , unique=False , nullable=False)
    is_admin = db.Column(db.Boolean , default=False)
    