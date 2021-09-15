import { TextField, CircularProgress, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import React from 'react'

export const Country = ({ val, onChange, data, open, onOpen, onClose, loading }) => {
    return (
        <Grid container spacing={3} style={{ paddingTop: 12 }}>
            <Grid item xs={12} sm={4}>
                <Autocomplete
                    style={{ marginBottom: 30 }}
                    open={open}
                    onOpen={onOpen}
                    onClose={onClose}
                    options={data}
                    autoHighlight
                    onChange={onChange}
                    value={{ Country: val.Country }}
                    getOptionSelected={(option, value) => option.Country === value.Country}
                    loading={loading}
                    getOptionLabel={(option) => option.Country || ''}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select your country"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                    renderOption={(option, { inputValue }) => {
                        const matches = match(option.Country, inputValue);
                        const parts = parse(option.Country, matches);
                        return (
                            <div>
                                {parts.map((part, index) => (
                                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                        {part.text}
                                    </span>
                                ))}
                            </div>
                        )
                    }}
                />
            </Grid>
        </Grid>
    )
}