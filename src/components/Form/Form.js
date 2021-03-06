import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './Form.css'
import { getPlanets, getVehicles, getToken, find } from '../../api'
import { v4 as uuidv4 } from 'uuid';
import Vehicles from './Vehicles';

export default function Form({ time, setTime, setResult, reset }) {
    const [planet, setPlanet] = useState("Select")
    const [selectedPlanetDetails, setSelectedPlanetDetails] = useState([])
    const [selectedVehicleDetails, setSelectedVehicleDetails] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState({})
    const [count, setCount] = useState(1)
    const [options, setOptions] = useState([])
    const [vehicles, setVehicles] = useState([])

    const [name, setName] = useState("")
    useEffect(() => {
        getPlanetList()
        getVehicleList()
        setPlanet("Select")
        setSelectedPlanetDetails([])
        setSelectedVehicleDetails([])
        setSelectedVehicle({})
        setCount(1)
        setName("")
    }, [reset])

    const getPlanetList = async () => {
        try {
            let { data } = await getPlanets()
            let options = data.map(planet => {
                planet.key = uuidv4()
                planet.value = planet.name
                planet.label = planet.name
                delete planet.name
                return planet
            })
            setOptions(options)
        } catch (error) {
            console.log(error)
        }
    }

    const getVehicleList = async () => {
        try {
            let { data } = await getVehicles()
            setVehicles(data)
        } catch (error) {
            console.log(error)
        }
    }
    const updateStates = () => {
        let selectedVehicleSpeed
        setSelectedPlanetDetails([...selectedPlanetDetails, planet])
        setSelectedVehicleDetails([...selectedVehicleDetails, selectedVehicle])
        setCount(count => count + 1)
        setName("")
        setPlanet("Select")
        const newOptions = options.filter(option => option.key !== planet.key)
        setOptions(newOptions)
        // update vehicle count
        const updatedVehicles = vehicles.map(vehicle => {
            if (vehicle.name === selectedVehicle.name) {
                vehicle.total_no -= 1
                selectedVehicleSpeed = vehicle.speed
            }
            return vehicle
        })
        setVehicles(updatedVehicles)
        setTime(time => {
            let newTime = planet.distance / selectedVehicleSpeed
            newTime += time
            return newTime
        })
    }


    const handleClick = () => {
        // update options
        if (selectedVehicle.hasOwnProperty("name") && planet !== "Select") {
            updateStates()
        }
    }

    const findFalcone = async () => {
        let planetNames = selectedPlanetDetails.map(selectedPlanetDetails => selectedPlanetDetails.name)
        let vehicleNames = selectedVehicleDetails.map(selectedVehicleDetails => selectedVehicleDetails.name)
        let token = await getToken()
        let requestData = { token: token.data.token, planet_names: planetNames, vehicle_names: vehicleNames }
        let { data } = await find(requestData)
        setResult(data)
    }

    return (
        <div className="main-form">
            <h2>Select planets you want to search in:</h2>
            <div className="time">Time {time}</div>
            {count <= 4 &&
                <div className="destination-container">
                    <div>
                        <p>Destination {count}</p>
                        <Select options={options} onChange={(e) => setPlanet(e)} value={planet} />
                        <Vehicles planet={planet} name={name} setName={setName} vehicles={vehicles} setSelectedVehicle={setSelectedVehicle} />
                    </div>
                    <button className="next-button" onClick={handleClick}>Next</button>
                </div>}
            {count > 4 && <div><button className="find-button" onClick={findFalcone}>Find Falcone!</button></div>}
        </div>
    )
}
