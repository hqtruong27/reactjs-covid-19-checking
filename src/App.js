import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Country } from "./components/countries/country";
import { Highlight } from "./components/highlight/highlight";
import { COUNTRIES } from './global/constants'

import Summary from "./components/summary/summary";
import CoronaAPI from "./components/api/corona-api";

function App() {

  const [open, setOpen] = useState(false);
  const [loadingBackDrop, setLoadingBackDrop] = useState(false);
  const [countries, setCountries] = useState([])
  const [params, setParams] = useState({ Country: null, Slug: null, from: null })
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
    setParams({ Slug: params?.Slug, Country: params?.Country, from: event.target.value })
  }

  useEffect(() => {
    if (params?.Slug) {
      setLoadingBackDrop(true)
      CoronaAPI.getReportPremiumByCountry(params.Slug, params.from).then((res) => {
        const result = { type: params.from === "ALL" ? "ALL" : params.from, data: res.data }
        setReport(result)
        setLoadingBackDrop(false)
      }).catch((err) => {
        console.error(err)
        setLoadingBackDrop(false)
      })

    }
  }, [params])

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Country
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        data={countries}
        loading={loading}
        onChange={handleChangeCountry}
        val={params} />
      <Highlight sum={report.data} />
      <Summary onChange={handleChangeSummary} data={report} />


    </div>
  );
}

export default App;
