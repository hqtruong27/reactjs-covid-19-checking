import { Grid } from '@material-ui/core'
import React from 'react'
import HighChart from '../charts/high-charts'

const Summary = ({ onChange, data }) => {
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} lg={8} xs={12} md={12} >
                <HighChart onChange={onChange} data={data} />
            </Grid>

            <Grid item sm={4} lg={8} xs={12} md={12} >

            </Grid>
        </Grid>
    )
}

export default Summary