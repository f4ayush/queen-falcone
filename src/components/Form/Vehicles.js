import React, { useState } from 'react'

export default function Vehicles({ vehicles, setVehicles, planet, setTime }) {

    const [name, setname] = useState("")
    const updateVehicles = (e) => {
        setname(e.target.value)
        let updatedVehicle = vehicles.filter(vehicle => vehicle.name === e.target.value)
        updatedVehicle[0].total_no -= 1
        console.log(updatedVehicle)
        setTime(time => {
            let newTime = planet.distance / updatedVehicle[0].speed
            newTime += time
            return newTime
        })
        // setVehicles([...vehicles, updatedVehicle])
    }

    // console.log(planet)
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            {
                vehicles.map((vehicle, index) => {
                    if (vehicle.total_no > 0 && vehicle.max_distance >= planet.distance) {
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    value={vehicle.name}
                                    checked={name === vehicle.name}
                                    onChange={updateVehicles} />
                                <span>{vehicle.name}({vehicle.total_no})</span>
                            </label>
                        )
                    }

                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                value={vehicle.name}
                                disabled
                                checked={name === vehicle.name}
                                onChange={(e) => setname(e.target.value)} />
                            <span style={{ color: "gray" }}>{vehicle.name}({vehicle.total_no})</span>
                        </label>
                    )

                })
            }

        </div>
    )
}
