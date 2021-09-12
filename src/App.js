import { useEffect, useState } from "react";
import CoronaAPI from "./components/api/corona-api";
import { Country } from "./components/countries/country";
import { Highlight } from "./components/highlight/highlight";
import Summary from "./components/summary/summary";
import { COUNTRIES } from './global/constants'

function App() {

  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([])

  const loading = open && countries.length === 0
  const [country, setCurrentCountry] = useState({ Country: null, Slug: null })

  const [report, setReport] = useState([])

  useEffect(() => {
    setCurrentCountry(COUNTRIES.VIE)
  }, [])

  useEffect(() => {
    if (!loading) return

    setTimeout(() => {
      CoronaAPI.getCountries().then((res) => {
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
      CoronaAPI.getReportByCountry(country.Slug).then((res) => {
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
      <Highlight report={report} />
      <Summary data={report} />
    </>
  );
}

export default App;
