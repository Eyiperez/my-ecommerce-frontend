import axios from 'axios'
const Requests = {}

Requests.productsByName = (search) => {
    return axios.get(`http://localhost:3084/product/${search}/name`)
}

Requests.shopsByName = (search) => {
    return axios.get(`http://localhost:3084/shop/${search}/all`)
}

Requests.productsByColor = (search) => {
    return axios.get(`http://localhost:3084/product/${search}/color`)
}

Requests.productsByCategory = (search) => {
    return axios.get(`http://localhost:3084/product/${search}/category`)
}

Requests.productsByDescription = (search) => {
    return axios.get(`http://localhost:3084/product/${search}/description`)
}



export default Requests