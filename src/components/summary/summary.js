import { Grid } from '@material-ui/core'
import React from 'react'
import HighChart from '../charts/high-charts'

const Summary = ({ data }) => {
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <HighChart data={data} />
            </Grid>

            <Grid item sm={4} xs={12}>

            </Grid>
        </Grid>
    )
}

export default Summary