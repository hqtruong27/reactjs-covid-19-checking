import { Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import _ from 'lodash'
import { CONSTANTS } from '../../global/constants'

export const Highlight = ({ sum }) => {
    const TOTAL_CASES = sum ? _(sum).sumBy(x => x.NewCases) : null
    const TOTAL_RECOVERED = sum ? _(sum).sumBy(x => x.Recovered) : null
    const TOTAL_DEATHS = sum ? _(sum).sumBy(x => x.NewDeaths) : null

    const summary = [
        {
            title: 'Total cases',
            total: TOTAL_CASES?.toLocaleString() ?? 'No data',
            type: CONSTANTS.TYPE.CONFIRMED
        },
        {
            title: 'Recovered',
            total: TOTAL_RECOVERED?.toLocaleString() ?? 'No data',
            type: CONSTANTS.TYPE.RECOVERED
        },
        {
            title: 'Deaths',
            total: TOTAL_DEATHS?.toLocaleString() ?? 'No data',
            type: CONSTANTS.TYPE.DEATHS
        },
    ]

    return (
        <Grid container spacing={3}>
            {summary.map(item => <HighlightCardContent key={item.type} type={item.type} title={item.title} total={item.total} />)}
        </Grid>
    )
}

const HighlightCardContent = ({ type, title, total }) => {
    const classes = styles({ type })
    return (
        <Grid item sm={4} xs={12} >
            <Card >
                <CardContent className={classes.wrapper} >
                    <Typography className={classes.title} component='p'>{title}</Typography>
                    <Typography className={classes.total} component='p'>{total}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

const styles = makeStyles({
    wrapper: ({ type }) => {
        switch (type) {
            case CONSTANTS.TYPE.CONFIRMED:
                return { borderLeft: '6px solid #c9302c' }
            case CONSTANTS.TYPE.RECOVERED:
                return { borderLeft: '6px solid #38E555' }
            case CONSTANTS.TYPE.DEATHS:
                return { borderLeft: '6px solid #4A4A4A' }
            default:
                return { borderLeft: '6px solid #4A4A4A' }
        }
    },
    title: {
        fontSize: '18px',
        marginBottom: '5px'
    },
    total: {
        fontSize: '18px',
        fontWeight: 'bold',
    }
})