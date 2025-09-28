import axios from "axios"


//In production there is no localhost, so we have to make it dynamic
const BaseURL= import.meta.env.MODE==="development"? "http://localhost:3002/api":"/api"

const api = axios.create({
    baseURL: BaseURL,
})

export default api