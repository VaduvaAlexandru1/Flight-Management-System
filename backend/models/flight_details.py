from extensions import db


class FlightDetails(db.Model):
    __tablename__ = "flight_details"

    id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.Integer, db.ForeignKey("flights.id"), nullable=False)

    tip_aeronava = db.Column(db.String(50))
    terminal_plecare = db.Column(db.String(10))
    poarta_imbarcare = db.Column(db.String(10))
    status_zbor = db.Column(db.String(20))
    capacitate_totala = db.Column(db.Integer)
    locuri_disponibile = db.Column(db.Integer)
