from extensions import db


class FlightDetails(db.Model):
    __tablename__ = "flight_details"

    id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.Integer, db.ForeignKey("flights.id"), nullable=False)

    aircraft_type = db.Column(db.String(50))
    departure_terminal = db.Column(db.String(50))
    boarding_gate = db.Column(db.String(50))
    flight_status = db.Column(db.String(50))
    total_capacity = db.Column(db.Integer)
    available_seats = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "flight_id": self.flight_id,
            "aircraft_type": self.aircraft_type,
            "departure_terminal": self.departure_terminal,
            "boarding_gate": self.boarding_gate,
            "flight_status": self.flight_status,
            "total_capacity": self.total_capacity,
            "available_seats": self.available_seats,
        }
