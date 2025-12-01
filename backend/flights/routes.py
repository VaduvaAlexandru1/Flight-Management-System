from . import flights_bp
from flask import jsonify , request
from models.flight import Flight
from models.flight_details import FlightDetails
from extensions import db
import json
import redis

# REDIS CONNECTION

r = redis.Redis(host="localhost" , port=6349 , db=0 , decode_responses=True)


# GET ALL FLIGHTS

@flights_bp.get("/all")
def get_all_flights():
    cashed_flights = r.get("all_flights")
    if cashed_flights :
        return jsonify(json.loads(cashed_flights)) , 200
    
    flights = Flight.query.all()
    result = [flight.to_dict() for flight in flights]
    
    return jsonify(result) , 200

# NEW FLIGHT

@flights_bp.post("/new-flight")
def new_flight():
    data = request.get_json(silent=True)
    try:
        flight = Flight(
            flight_number = data["flight_number"],
            price = data["price"],
            departure_airport = data["departure_airport"],
            arrival_airport = data["arrival_airport"],
            departure_time = data["departure_time"],
            arrival_time = data["arrival_time"],
            company = data["company"]
        )
        
        details_data = flight.get("details" , {})
        details = FlightDetails(
            aircraft_type = details_data.get("aircraft_type" , ""),
            departure_terminal = details_data.get("departure_terminal" , ""),
            boarding_gate = details_data.get("boarding_gate" , ""),
            flight_status = details_data.get("flight_status" , ""),
            total_capacity = details_data.get("total_capacity" , 0),
            available_seats = details_data.get("available_seats" , 0)
        )
        
        flight.details = details
        db.session.add(flight)
        db.session.commit()
        
        return jsonify({
            "message" : "Flight was addded",
        }) , 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message" : "Error creating flight"
        }) , 400
        

# VIEW FLIGHT BY ID
@flights_bp.get("/<int:flight_id>")
def get_flight(id):
    pass

# UPDATE FLIGHT

# DELETE FLIGHT