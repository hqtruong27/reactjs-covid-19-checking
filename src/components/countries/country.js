import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';
import React from 'react'

const Country = ({ value, onChange, data }) => {

    return (
        <FormControl>
            <InputLabel htmlFor="country" shrink >Countries</InputLabel>
            <NativeSelect value={value} onChange={onChange} inputProps={{ id: 'country', name: 'countries' }}>
                {
                    data.map((x) => <option key={x.ISO2} value={x.slug}>{x.Country}</option>)
                }
            </NativeSelect>
            <FormHelperText>Choose your country</FormHelperText>
        </FormControl>
    )
}

export default Country;