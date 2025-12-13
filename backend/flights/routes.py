from flask_jwt_extended import jwt_required

from wrappers import admin_required
from . import flights_bp
from flask import jsonify, request
from models.flight import Flight
from models.flight_details import FlightDetails
from extensions import db
import json
import redis
from dotenv import load_dotenv
import os

load_dotenv('../../.env')

# REDIS CONNECTION

r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)


# GET ALL FLIGHTS


@flights_bp.get("/all")
@jwt_required(locations=['cookies'])
def get_all_flights():
    cashed_flights = r.get("all_flights")
    if cashed_flights:
        return jsonify(json.loads(cashed_flights)), 200
    flights = Flight.query.all()
    result = [flight.to_dict() for flight in flights]
    
    r.set("all_flights", json.dumps(result), ex=60)

    return jsonify(result), 200


# NEW FLIGHT


@flights_bp.post("/new-flight")
@admin_required
def new_flight():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        from datetime import datetime

        flight = Flight(
            flight_number=data["flight_number"],
            price=data["price"],
            departure_airport=data["departure_airport"],
            arrival_airport=data["arrival_airport"],
            departure_time=datetime.fromisoformat(data["departure_time"]),
            arrival_time=datetime.fromisoformat(data["arrival_time"]),
            company=data["company"],
        )

        details_data = data.get("details", {})
        details = FlightDetails(
            aircraft_type=details_data.get("aircraft_type", ""),
            departure_terminal=details_data.get("departure_terminal", ""),
            boarding_gate=details_data.get("boarding_gate", ""),
            flight_status=details_data.get("flight_status", ""),
            total_capacity=details_data.get("total_capacity", 0),
            available_seats=details_data.get("available_seats", 0),
        )

        flight.details = details

        db.session.add(flight)
        db.session.commit()

        r.delete("all_flights")
        return jsonify({"message": "Flight added", "id": flight.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error creating flight: {str(e)}"}), 400


# VIEW FLIGHT BY ID
@flights_bp.get("/<int:flight_id>")
@jwt_required(locations=['cookies'])
def get_flight(flight_id):
    
    cached_flight = r.get(f"flight:{flight_id}")
    if cached_flight:
        return jsonify(json.loads(cached_flight)), 200
    
    flight = Flight.query.filter_by(id=flight_id).first_or_404()
    flight_data = flight.to_dict()
    
    r.set(f"flight:{flight_id}", json.dumps(flight_data), ex=60)
    return jsonify(flight.to_dict()) , 200


# UPDATE FLIGHT
@flights_bp.patch("/<int:flight_id>")
@admin_required
def update_flight(flight_id):
    flight = Flight.query.filter_by(id=flight_id).first_or_404()
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        from datetime import datetime

        if "flight_number" in data:
            flight.flight_number = data["flight_number"]
        if "price" in data:
            flight.price = data["price"]
        if "departure_airport" in data:
            flight.departure_airport = data["departure_airport"]
        if "arrival_airport" in data:
            flight.arrival_airport = data["arrival_airport"]
        if "departure_time" in data:
            flight.departure_time = datetime.fromisoformat(data["departure_time"])
        if "arrival_time" in data:
            flight.arrival_time = datetime.fromisoformat(data["arrival_time"])
        if "company" in data:
            flight.company = data["company"]

        details_data = data.get("details", {})
        if flight.details is None:
            flight.details = FlightDetails()

        if "aircraft_type" in details_data:
            flight.details.aircraft_type = details_data["aircraft_type"]
        if "departure_terminal" in details_data:
            flight.details.departure_terminal = details_data["departure_terminal"]
        if "boarding_gate" in details_data:
            flight.details.boarding_gate = details_data["boarding_gate"]
        if "flight_status" in details_data:
            flight.details.flight_status = details_data["flight_status"]
        if "total_capacity" in details_data:
            flight.details.total_capacity = details_data["total_capacity"]
        if "available_seats" in details_data:
            flight.details.available_seats = details_data["available_seats"]

        db.session.commit()
        
        r.delete("all_flights")
        r.delete(f"flight:{flight.id}")
        
        return jsonify({"message": "Flight updated", "id": flight.id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error updating flight: {str(e)}"}), 400

# DELETE FLIGHT

@flights_bp.delete("/<int:flight_id>")
@admin_required
def delete_flight(flight_id):
    flight = Flight.query.filter_by(id=flight_id).first_or_404()
    
    db.session.delete(flight)
    db.session.commit()
    
    r.delete("all_flights")
    r.delete(f"flight:{flight_id}")

    return {"message": "Flight deleted successfully"}, 200
    
    
