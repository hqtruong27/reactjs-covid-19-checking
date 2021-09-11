import { useEffect, useState } from "react";
import CoronaAPI from "./components/api/corona-api";
import Country from "./components/countries/country";
import { Highlight } from "./components/highlight/highlight";
import Summary from "./components/summary/summary";


function App() {

  const [countries, setCountries] = useState([])

  const [country, setCurrentCountry] = useState('')

  const [report, setReport] = useState([])

  useEffect(() => {
    CoronaAPI.getCountries().then((res) => {
      setCountries(res.data);
    }).catch((err) => console.log(err))
  }, [])


  const onChange = (event) => setCurrentCountry(event.target.value)

  useEffect(() => {
    if (country) {
      CoronaAPI.getReportByCountry(country).then((res) => {
        setReport(res.data)
      }).catch((err) => console.error(err))
    }
  }, [country])

  return (
    <>
      <Country data={countries} onChange={onChange} />
      <Highlight report={report} />
      <Summary report={report} />
    </>
  );
}

export default App;
