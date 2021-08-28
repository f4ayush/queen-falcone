import axios from "axios";
const API = axios.create({ baseURL: "https://findfalcone.herokuapp.com" })

export const getPlanets = () => API.get('/planets')
export const getVehicles = () => API.get('/vehicles')
export const getToken = () => API.post('/token', "", { headers: { Accept: "application/json" } })
export const find = (data) => API.post('/find', data, { headers: { "Accept": "application/json", "Content-Type": "application/json" } })