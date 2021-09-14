import { useEffect, useState } from "react";
import CoronaAPI from "./components/api/corona-api";
import { Country } from "./components/countries/country";
import { Highlight } from "./components/highlight/highlight";
import Summary from "./components/summary/summary";
import { COUNTRIES } from './global/constants'

function App() {

  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([])
  const [country, setCurrentCountry] = useState({ Country: null, Slug: null })
  const [report, setReport] = useState([])

  const loading = open && countries.length === 0

  useEffect(() => {
    setCurrentCountry(COUNTRIES.VIE)
  }, [])

  useEffect(() => {
    if (!loading) return

    setTimeout(() => {
      CoronaAPI.countries().then((res) => {
        setCountries(res.data)
      }).catch((err) => console.log(err))
    }, 1e3)

  }, [loading])


  useEffect(() => {
    if (!open) {
      setCountries([]);
    }
  }, [open]);

  const onChange = (_, value) => {
    setCurrentCountry({ Slug: value?.Slug, Country: value?.Country })
  }

  useEffect(() => {
    if (country?.Slug) {
      CoronaAPI.getReportPremiumByCountry(country.Slug).then((res) => {
        setReport(res.data)
      }).catch((err) => console.error(err))

    }
  }, [country])

  return (
    <>
      <Country
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        data={countries}
        loading={loading}
        onChange={onChange}
        val={country} />
      <Highlight sum={report} />
      <Summary data={report} />
    </>
  );
}

export default App;
