import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';
import React from 'react'

const Country = ({ value, event, countries }) => {

    return (
        <FormControl>
            <InputLabel htmlFor="country" shrink >Countries</InputLabel>
            <NativeSelect value={value} onChange={event} inputProps={{ id: 'country', name: 'countries' }}>
                {
                    countries.map((x) => { return <option value={x.ISO2}>{x.Country}</option> })
                }
            </NativeSelect>
            <FormHelperText>Choose your country</FormHelperText>
        </FormControl>
    )
}

export default Country;