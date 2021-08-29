import React, { useState, useEffect } from 'react'

export default function Vehicles({ name, setName, vehicles, setSelectedVehicle, planet }) {


    const selectVehicle = (e, vehicle) => {
        setName(e.target.value)
        setSelectedVehicle(vehicle)
    }

    const style = {
        marginTop: "8px"
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            {
                vehicles.map((vehicle, index) => {
                    if (vehicle.total_no > 0 && vehicle.max_distance >= planet.distance) {
                        return (
                            <label style={style} key={index}>
                                <input
                                    type="radio"
                                    value={vehicle.name}
                                    checked={name === vehicle.name}
                                    onChange={(e) => selectVehicle(e, vehicle)} />
                                <span>{vehicle.name}({vehicle.total_no})</span>
                            </label>
                        )
                    }

                    return (
                        <label style={style} key={index}>
                            <input
                                type="radio"
                                value={vehicle.name}
                                disabled
                                checked={name === vehicle.name}
                                onChange={(e) => setName(e.target.value)} />
                            <span style={{ color: "gray" }}>{vehicle.name}({vehicle.total_no})</span>
                        </label>
                    )

                })
            }

        </div>
    )
}
