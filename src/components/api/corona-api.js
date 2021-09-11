import axios from "axios"


const CoronaAPI = {
    getCountries: () => {
        return axios.get('https://api.covid19api.com/countries')
    },

    getReportByCountry: (country) => {
        const config = {
            method: 'get',
            url: `https://api.covid19api.com/dayone/country/${country}`,
            headers: {}
        };

        return axios(config)
    }
}

export default CoronaAPI;