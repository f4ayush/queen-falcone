import React from 'react'
import './Header.css'

export default function Header({ setReset }) {
    return (
        <nav>
            <h1>Finding Falcone!</h1>
            <button className="reset" onClick={() => setReset(reset => reset + 1)}>Reset</button>

        </nav>
    )
}
