import axios from 'axios'

const baseURL = 'https://api.ipify.org?format=json'
const IP = {
    lookup: () => {
        const config = {
            baseURL: 'https://geolocation-db.com/',
        }

        return axios.get('json/', config)
    },

    getLocation: (ip) => {
        const config = {
            baseURL: 'https://geolocation-db.com/',
        }

        return axios.get(`json/${ip}`, config)
    },

    getCountry: (ip) => {
        const config = {
            baseURL: 'https://geolocation-db.com/',
        }

        return axios.get(`json/${ip}/country`, config)
    },
}

export default IP