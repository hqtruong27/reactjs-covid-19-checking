import { useEffect, useState } from "react";
import CoronaAPI from "./components/api/corona-api";
import { Country } from "./components/countries/country";
import { Highlight } from "./components/highlight/highlight";
import Summary from "./components/summary/summary";
import { COUNTRIES } from './global/constants'

function App() {

  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([])
  const [params, setParams] = useState({ Country: null, Slug: null })
  const [report, setReport] = useState([])

  const loading = open && countries.length === 0

  useEffect(() => {
    setParams(COUNTRIES.VIE)
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

  const handleChangeCountry = (_, value) => {
    setParams({ Slug: value?.Slug, Country: value?.Country })
  }

  const handleChangeSummary = (event) => {
    setParams({ Slug: params?.Slug, Country: params?.Country, query: event.target.value })
  }

  useEffect(() => {
    console.log(params)
    if (params?.Slug) {
      CoronaAPI.getReportPremiumByCountry(params.Slug, params.query).then((res) => {
        setReport(res.data)
      }).catch((err) => console.error(err))

    }
  }, [params])

  return (
    <>
      <Country
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        data={countries}
        loading={loading}
        onChange={handleChangeCountry}
        val={params} />
      <Highlight sum={report} />
      <Summary onChange={handleChangeSummary} data={report} />
    </>
  );
}

export default App;
