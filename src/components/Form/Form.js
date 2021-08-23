import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './Form.css'
import { getPlanets, getVehicles } from '../../api'
import { v4 as uuidv4 } from 'uuid';
import Vehicles from './Vehicles';

export default function Form() {
    const [planets, setPlanets] = useState([])
    const [options, setOptions] = useState([])
    const [isSelected, setIsSelected] = useState({ 1: false, 2: false, 3: false, 4: false })
    const [vehicles, setVehicles] = useState([])
    useEffect(() => {
        getPlanetList()
        getVehicleList()
    }, [])

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
            console.log(vehicles)

        } catch (error) {

        }
    }

    const getOptionValue = (e, index) => {
        let newOptions = options.filter(option => option.key !== e.key)
        setOptions(newOptions)
        let selectedPlanets = [...planets, e]
        setPlanets(selectedPlanets)
        isSelected[index] = true
        setIsSelected(isSelected)
    }
    return (
        <div>
            <h2>Select planets you want to search in:</h2>
            <div className="destination-container">
                <div>
                    <p>Destination 1</p>
                    <Select options={options} onChange={(e) => getOptionValue(e, 1)} />
                    {isSelected[1] && <Vehicles />}
                </div>
                <div>
                    <p>Destination 2</p>
                    <Select options={options} onChange={(e) => getOptionValue(e, 2)} />
                    {isSelected[2] && <Vehicles />}
                </div>
                <div>
                    <p>Destination 3</p>
                    <Select options={options} onChange={(e) => getOptionValue(e, 3)} />
                    {isSelected[3] && <Vehicles />}
                </div>
                <div>
                    <p>Destination 4</p>
                    <Select options={options} onChange={(e) => getOptionValue(e, 4)} />
                    {isSelected[4] && <Vehicles />}
                </div>
            </div>

            <button>Find Falcone!</button>
        </div>
    )
}
