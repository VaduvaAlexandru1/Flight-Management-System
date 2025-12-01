from extensions import db


class Flight(db.Model):
    __tablename__ = "flights"

    id = db.Column(db.Integer, primary_key=True)
    flight_number = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    departure_airport = db.Column(db.String(50), nullable=False)
    arrival_airport = db.Column(db.String(50), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    arrival_time = db.Column(db.DateTime, nullable=False)
    company = db.Column(db.String(100))

    details = db.relationship(
        "FlightDetails", backref="flight", uselist=False, cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "flight_number": self.flight_number,
            "price": self.price,
            "departure_airport": self.departure_airport,
            "arrival_airport": self.arrival_airport,
            "departure_time": self.departure_time.isoformat(),
            "arrival_time": self.arrival_time.isoformat(),
            "company": self.company,
            "details": self.details.to_dict() if self.details else None,
        }
