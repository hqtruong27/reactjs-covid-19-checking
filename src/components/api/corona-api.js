import axios from "axios"
import moment from "moment"

let config = {
    baseURL: 'https://api.covid19api.com',
    headers: {
        'Content-Type': 'application/json',
    }
}

const CoronaAPI = {
    /**
     * get all countries
     * @returns
     */
    countries: () => axios.get('/countries', config),

    /**
     * get report by Country
     * @param {*} country Slug country
     * @returns
     */
    getReportByCountry: (country) => axios.get(`/dayone/country/${country}`, config),

    /**
     * sum report date now - 1 day
     * @param {*} country slug country
     * @returns
     */
    sumReportByCountry: (country) => axios.get(`/live/country/${country}/status/all/date/${moment().subtract(2, 'days').format('YYYY-MM-DD')}`, config),


    /**
     * get report by Country
     * @param {*} country
     * @param {*} from from date yyyy/mm/dd
     * @param {*} to to date yyyy/mm/dd
     * @returns
     */
    getReportPremiumByCountry: (country, from, to) => {
        config.headers['X-Access-Token'] = '2f0d9db1-1d6c-4813-ac99-c19a8b6aedab'

        let url = `/premium/country/${country}`
            + (from ? `?from=${moment().subtract((parseInt(from) + 1), 'days').format('YYYY-MM-DD')}` + (to ? `&to=${to}`
                : `&to=${moment().subtract(1, 'days').format('YYYY-MM-DD')}`) : (to ? `?to=${to}` : ''))

        return axios.get(url, config)
    }
}

export default CoronaAPI