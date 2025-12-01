import React from 'react'
import styles from './flightcard.module.css'

const FlightCard = ({flight}) => {
  return (
    <div className={styles["card"]}>
        <div>Price : {flight.price}</div>
        <div>Number : {flight.flight_number}</div>
    </div>
  )
}

export default FlightCard
