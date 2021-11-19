import { TextField, InputAdornment, Grid, makeStyles, Container } from '@material-ui/core'
import { Backdrop, CircularProgress } from '@mui/material'
import { Autocomplete } from '@material-ui/lab'
import { useEffect, useState } from "react"
import { Search } from "@material-ui/icons"

import { Highlight } from './components/highlight/highlight'
import UrlExtension from './global/extension'
import Summary from "./components/summary/summary"
import CoronaAPI from "./components/api/corona-api"

const useStyles = makeStyles(theme => ({
  root: {
    width: "95%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    '@media(min-width: 780px)': {
      width: "45%",
    },
  },
  inputRoot: {
    borderRadius: 100,
    border: '1px solid #dadce0',
    boxShadow: '0 1px 5px rgb(0 0 0 / 25%)',
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px",
      borderColor: "#dadce0"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px",
      borderColor: "#dadce0"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px",
      borderColor: "#dadce0"
    }
  }
}))

function App() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [loadingBackDrop, setLoadingBackDrop] = useState(false)
  const [countries, setCountries] = useState([])
  const [params, setParams] = useState({ Country: null, Slug: null, ISO2: null, from: null })
  const [report, setReport] = useState([])
  const [summary, setSummary] = useState({})

  useEffect(() => {
    const dataCountries = CoronaAPI.countries()
    setCountries(dataCountries)

    CoronaAPI.summaryTotalAsync().then((response) => {
      if (response) {
        const { result = {}, data } = response
        Object.keys(data).filter(key => !key.includes('OWID_')).map(key => result[key] = data[key])
        const { hl } = UrlExtension.find(['hl'])
        const summary = hl && result.hasOwnProperty(hl) ? { [hl]: result[hl] } : result
        setSummary(summary)
      }
    })

    // _context.table('countries').get('cached-country').then(async (response) => {
    //   if (!response) {
    //     const res = await CoronaAPI.countriesAsync()
    //     if (res.status === 200) {
    //       const data = res.data
    //       setCountries(data)
    //       await Promise.all([init(data), _context.table('countries').put(data, 'cached-country')])
    //     }
    //   } else {
    //     setCountries(response)
    //     await init(response)
    //   }
    // }).catch((err) => console.log(err))
  }, [])

  const handleChangeCountry = (_, value) => {
    const { hl, sum } = UrlExtension.find(['hl', 'sum'])
    setParams({ Country: value?.name.common, ISO2: value?.cca3, from: sum ?? undefined })
  }

  const handleChangeSummary = (event) => {
    const from = event.target?.value
    UrlExtension.append('sum', from)
    setParams({ Slug: params?.Slug, Country: params?.Country, ISO2: params?.ISO2, from: from })
  }

  useEffect(() => {
    if (params?.Slug && params?.ISO2) {
      setLoadingBackDrop(true)
      CoronaAPI.getReportPremiumByCountry(params.Slug, params.from).then((res) => {
        const result = { type: params.from, data: res.data }
        setReport(result)
        return CoronaAPI.specificCountry(params.ISO2)
      }).then(response => {
        if (response) {
          setSummary(response.data)
        }
      }).catch((err) => console.error(err))
        .finally(() => setLoadingBackDrop(false))
    }
  }, [params])

  return (
    <div>
      <Container maxWidth="xl">
        <Grid container
          direction="column"
          alignItems="center"
          justifyContent="center"  >
          <Grid className={classes.root} >
            <Autocomplete disableClearable
              classes={{ inputRoot: classes.inputRoot }}
              inputValue={inputValue ?? ''}
              onChange={(_, value) => {
                const cca3 = value?.cca3
                if (cca3) UrlExtension.append('hl', cca3)
                setOpen(false)
                setInputValue(value?.name.common)
                handleChangeCountry(_, value)
              }}
              onFocus={(e) => {
                setInputValue()
              }}
              onBlur={(e) => {
                setOpen(false)
                setInputValue(params.Country)
              }}
              onInputChange={(event) => {
                const value = event?.target?.value
                setOpen(value?.length > 2)
                setInputValue(value)
              }}
              open={open}
              options={countries}
              getOptionLabel={(option) => option.name.common || ''}
              getOptionSelected={(option, value) => option.cca3 === value.cca3}
              renderInput={(params) =>
                <TextField
                  {...params}
                  placeholder="Select a location"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    )
                  }}
                />
              }
            />
          </Grid>
        </Grid>
        <Highlight data={summary} />
        <Summary value={params?.from} onChange={handleChangeSummary} data={report} />

        {/* --backdrop loading-- */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadingBackDrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </div>
  )
}

export default App
