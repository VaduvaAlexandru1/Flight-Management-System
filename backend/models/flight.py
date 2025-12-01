from extensions import db

class Flight(db.Model):
    __tablename__ = "flights"

    id = db.Column(db.Integer, primary_key=True)
    flight_number = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Integer , nullable = False)
    departure_airport = db.Column(db.String(10), nullable=False)
    arrival_airport = db.Column(db.String(10), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    arrival_time = db.Column(db.DateTime, nullable=False)
    company = db.Column(db.String(100))

    detalii = db.relationship("FlightDetails", backref="flight", uselist=False)

    def to_dict(self):
        return {
            "id" : self.id,
            "flight_number" : self.flight_number,
            "arrival_airport" : self.arrival_airport,
            "departure_time" : self.departure_airport,
            "company" : self.company
        }