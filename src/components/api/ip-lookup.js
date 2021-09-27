import axios from 'axios'

const IP = {
 lookup: () => {
  const config = {
   baseURL: 'https://geolocation-db.com/',
  }

  return axios.get('json/', config)
 },
}

export default IP