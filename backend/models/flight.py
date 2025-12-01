from extensions import db

class Flight(db.Model):
    __tablename__ = "flights"

    id = db.Column(db.Integer, primary_key=True)
    numar_zbor = db.Column(db.String(20), nullable=False)
    aeroport_plecare = db.Column(db.String(10), nullable=False)
    aeroport_sosire = db.Column(db.String(10), nullable=False)
    ora_plecare = db.Column(db.DateTime, nullable=False)
    ora_sosire = db.Column(db.DateTime, nullable=False)
    companie = db.Column(db.String(100))

    detalii = db.relationship("FlightDetails", backref="flight", uselist=False)
