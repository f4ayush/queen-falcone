import axios from "axios";
const API = axios.create({ baseURL: "https://findfalcone.herokuapp.com" })

export const getPlanets = () => API.get('/planets')
export const getVehicles = () => API.get('/vehicles')