import axios from 'axios'
import dayjs from 'dayjs'
import countriesFile from '../../global/countries.json'

const utm_source = 'covid19checking.com'

const config = {
    baseURL: 'https://api.covid19api.com',
    headers: {
        'Content-Type': 'application/json',
        'Request-From': 'https://covid19checking.com',
    },
    params: {
        utm_source: utm_source
    }
}

const config_Novel = {
    baseURL: 'https://disease.sh/v3/covid-19/',
    headers: {
        'Content-Type': 'application/json',
        'Request-From': 'https://covid19checking.com',
    },
    params: {
        t: new Date().getTime(),
        utm_source: utm_source
    }
}

const url_oWid_vaccine = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json'

const CoronaAPI = {
    /**
     * get all countries
     * @returns
     */
    countries: async () => await axios.get('/countries', config),

    countriesAsync: () => countriesFile,
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
    sumReportByCountry: (country) => axios.get(`/live/country/${country}/status/all/date/${dayjs().subtract(2, 'day').format('YYYY-MM-DD')}`, config),

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
            + (from ? `?from=${dayjs().subtract((parseInt(from) + 1), 'day').format('YYYY-MM-DD')}` + (to ? `&to=${to}`
                : `&to=${dayjs().subtract(1, 'days').format('YYYY-MM-DD')}`) : (to ? `?to=${to}` : ''))

        return axios.get(url, config)
    },

    /**
     * Get global COVID-19 totals for today, yesterday and two days ago
     * @param {boolean} yesterday For this parameter you can show yesterday data. Available values : true, false, 1, 0.
     * @param {boolean} twoDaysAgo Queries data reported two days ago
     * @param {boolean} allowNull By default, if a value is missing, it is returned as 0. This allows nulls to be returned
     */
    summary: (yesterday, twoDaysAgo, allowNull) => axios.get('all?yesterday=' + (yesterday && yesterday === true ? 'true' : 'false') + (twoDaysAgo && twoDaysAgo === true ? '&twoDaysAgo=true' : '') + (allowNull ? '&allowNull=' + allowNull : ''), config_Novel),

    /**
     * Get COVID-19 totals for a specific country
     * @param {string} country Country code (ISO2)
     * @param {boolean} yesterday For this parameter you can show yesterday data
     * @param {boolean} twoDaysAgo Queries data reported two days ago
     * @param {boolean} strict Defaults to true. Setting to false gives you the ability to fuzzy search countries. Example Oman vs. rOMANia
     */
    specificCountry: (country, yesterday, twoDaysAgo, strict, allowNull) => {
        const url = 'countries/' + country + '?yesterday=' + (yesterday && yesterday === true ? 'true' : 'false')
            + (twoDaysAgo && twoDaysAgo === true ? '&twoDayAgo=true' : '')
            + '&strict=' + ((!strict || strict === true) ? strict : 'false')
            + (allowNull ? '&allowNull=' + allowNull : '')

        return axios.get(url, config_Novel)
    },

    /**
     * Get COVID-19 vaccine doses administered for all countries that have reported rolling out vaccination. Sourced from https://covid.ourworldindata.org/
     * @param {number | String} lastdays Number of days to return. Use 'all' for the full data set (e.g. 15, all, 24)
     * Default value : 30
     * @param {boolean} fullData Flag indicating whether to return timeline data type as simpleVaccineTimeline (false) or fullVaccineTimeline (true).
     * Default value : false
     */
    vaccine: (lastdays, fullData) => axios.get('vaccine/coverage/countries?lastdays=' + (lastdays ? lastdays : '30') + '&fullData=' + (fullData && fullData === true ? fullData : 'false'), config_Novel),

    /**
     * Get COVID-19 vaccine doses administered for a country that has reported vaccination rollout. Sourced from https://covid.ourworldindata.org/
     * @param {String} country A valid country name, iso2, iso3
     * @param {number | String} lastdays Number of days to return. Use 'all' for the full data set (e.g. 15, all, 24)
     * Default value : 30
     * @param {boolean} fullData Flag indicating whether to return timeline data type as simpleVaccineTimeline (false) or fullVaccineTimeline (true).
     * Default value : false
     */
    vaccineSpecificByCountry: (country, lastdays, fullData) => axios.get('vaccine/coverage/countries/' + country + '?lastdays=' + (lastdays ? lastdays : '30') + '&fullData=' + (fullData && fullData === true ? fullData : 'false'), config_Novel),

    summaryTotalAsync: () => axios.get(url_oWid_vaccine, {

        params: {
            t: new Date().getTime(),
            utm_source: utm_source
        },
    })
}

export default CoronaAPI