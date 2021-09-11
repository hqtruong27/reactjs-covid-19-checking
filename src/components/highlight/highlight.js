import { Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { TYPE } from '../../global/constants'


export const Highlight = ({ report }) => {
    const data = report[report.length - 1] ?? []

    const summary = [
        {
            title: 'Total cases',
            total: data.Confirmed ?? 'NA',
            type: TYPE.CONFIRMED
        },
        {
            title: 'Recovered',
            total: data.Recovered ?? 'NA',
            type: TYPE.RECOVERED
        },
        {
            title: 'Deaths',
            total: data.Deaths ?? 'NA',
            type: TYPE.DEATHS
        },
    ]

    return (
        <div>
            <Grid container spacing={3}>
                {summary.map(item => <HighlightCardContent key={item.type} type={item.type} title={item.title} total={item.total} />)}
            </Grid>
        </div>
    )
}

const HighlightCardContent = ({ type, title, total }) => {
    console.log(type, title, total)
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
            case TYPE.CONFIRMED:
                return { borderLeft: '6px solid #c9302c' }
            case TYPE.RECOVERED:
                return { borderLeft: '6px solid #927228' }
            case TYPE.DEATHS:
                return { borderLeft: '6px solid #333' }
            default:
                return { borderLeft: '6px solid #c9302c' };
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