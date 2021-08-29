import React from 'react'
import './Result.css'
export default function Result({ time, result, setReset }) {
    let message = result.status === "true" ? "Success! Congratulations on Finding Falcone. King Shan is mighty pleased." : "Oops! Falcone is somewhere else."

    return (
        <div className="result-container">
            {message}
            <p>Time taken: {time}</p>
            {result.status === "true" && <p>Planet Found: {result.planet_name}</p>}

            <button onClick={() => setReset(true)}>Start Again</button>
        </div>
    )
}
