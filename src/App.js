import { Autocomplete } from "@material-ui/lab"
import { makeStyles, TextField, InputAdornment, Grid } from "@material-ui/core"
import { Backdrop, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { createBrowserHistory } from 'history'
import { Search } from "@material-ui/icons"

import { Highlight } from "./components/highlight/highlight"
import { COUNTRIES } from './global/constants'
import _context from './database/db-dexie'
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
    // "& .MuiOutlinedInput-notchedOutline": {
    //   borderWidth: "1px",
    //   borderColor: "#dadce0"
    // },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px",
      borderColor: "#dadce0"
    },
    // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //   borderWidth: "1px",
    //   borderColor: "#dadce0"
    // }
  }
}))

let currentValue;
let history = createBrowserHistory()

function App() {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loadingBackDrop, setLoadingBackDrop] = useState(false);
  const [countries, setCountries] = useState([])
  const [params, setParams] = useState({ Country: null, Slug: null, from: null })
  const [report, setReport] = useState([])

  useEffect(() => {
    setParams(COUNTRIES.VIE)
  }, [])

  useEffect(() => {
    _context.table('countries').get('cached-country').then((response) => {
      if (response) {
        CoronaAPI.countries().then((res) => {
          console.log(res)
          setCountries(res.data)
          _context.table('countries').put(res.data, 'cached-country').then()
          return;
        }).catch((err) => {
          console.log(err)
        })
      } else {
        setCountries(response)
      }
    }).catch((err) => console.log(err))
  }, [])

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
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"  >
        <Grid className={classes.root} >
          <Autocomplete
            disableClearable
            classes={{ inputRoot: classes.inputRoot }}
            freeSolo
            inputValue={inputValue ?? ''}
            onChange={(_, value) => {
              setOpen(false)
              setInputValue(value?.Country)
            }}
            onFocus={(e) => {
              setInputValue('')
              currentValue = e.target.value
              console.log({ targetFocus: e.target.value, valueFocus: currentValue })
            }}
            onBlur={(e) => {
              history.push({
                pathname: '/home',
                search: '?the=query'
              })

              console.log(params)
              setOpen(false)
              setInputValue(e.target.value !== '' ? e.target.value : currentValue)
            }}
            onInputChange={(event) => {
              const value = event.target.value

              setOpen(value?.length > 2 ? true : false)
              console.log(value)
              setInputValue(value)
            }}
            open={open}
            options={countries}
            getOptionLabel={(option) => option.Country || ''}
            renderInput={(params) =>
              <TextField
                {...params}
                label="Select a location"
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

      {/* <Country
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        data={countries}
        loading={loading}
        onChange={handleChangeCountry}
        val={params} /> */}
      <Highlight sum={report.data} />
      <Summary onChange={handleChangeSummary} data={report} />

      {/* --backdrop loading-- */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
