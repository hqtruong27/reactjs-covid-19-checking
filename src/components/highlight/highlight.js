import { /*Card, CardContent,*/ Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { CONSTANTS } from '../../global/constants'
import { Grid } from '@mui/material'
import _ from 'lodash'

export const Highlight = ({ data }) => {
    const TOTAL_CASES = data ? data?.sum?.cases : null
    const TOTAL_RECOVERED = data ? data?.sum?.todayCases : null
    const TOTAL_DEATHS = data ? data?.sum?.deaths : null
    const COUNTRY_NAME = data && data?.sum?.country ? data?.sum?.country : 'Worldwide'

    const dataVaccines = data?.vaccine
    const TOTAL_DOES_GIVEN = dataVaccines ? _(dataVaccines).sumBy(x => x.timeline[0].total) ?? null : null
    const NEW_DOES_GIVEN = dataVaccines ? _(dataVaccines).sumBy(x => x.timeline[0].daily) ?? null : null
    console.log(TOTAL_DOES_GIVEN)
    console.log(NEW_DOES_GIVEN)
    const summary = [
        {
            title: 'Total cases',
            total: TOTAL_CASES?.toLocaleString() ?? 'No data',
            type: CONSTANTS.TYPE.CONFIRMED
        },
        {
            title: 'New cases (to day)',
            total: TOTAL_RECOVERED?.toLocaleString() ?? 'No data',
            type: CONSTANTS.TYPE.RECOVERED
        },
        {
            title: 'Deaths',
            total: TOTAL_DEATHS?.toLocaleString() ?? 'No data',
            type: CONSTANTS.TYPE.DEATHS
        }
    ]

    const vaccines = [
        {
            title: 'Total doses given',
            total: TOTAL_DOES_GIVEN?.toLocaleString() ?? 'No data',
            type: ''
        },
        {
            title: 'New doses given (2 days)',
            total: NEW_DOES_GIVEN?.toLocaleString() ?? 'No data',
            type: ''
        },
        {
            title: 'People fully vaccinated',
            total: TOTAL_DOES_GIVEN?.toLocaleString() ?? 'No data',
            type: ''
        }
    ]
    const classes = styles()
    return (
        <Grid>
            <Grid className={classes.block}>
                <div className={classes.card__header}>{COUNTRY_NAME}</div>
                <Grid container justifyContent="center">
                    {summary.map((item, index) => (
                        <Grid key={index} item sm={4} xs={4} >
                            <Typography className={classes.card__content} component='div'>
                                <p className={classes.card__title}>{item.title}</p>
                                <p className={classes.card__body}>{item.total}</p>
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item sm={12} xs={12} className={classes.segmentation}></Grid>
                    <Grid item sm={4} xs={4} >
                        <Typography className={classes.card__content} component='div'>
                            <p className={classes.card__title}>Total doses given</p>
                            <p className={classes.card__body}>6,244,182,886</p>
                        </Typography>
                    </Grid>
                    <Grid item sm={4} xs={4} >
                        <Typography className={`${classes.card__content} ${classes.card__block}`} component='div'>
                            <p className={classes.card__title}>New doses given (14 days)</p>
                            <p className={classes.card__body}>Sep 16–29: +407,621,891</p>
                        </Typography>
                    </Grid>
                    <Grid item sm={4} xs={4} >
                        <Typography className={classes.card__content} component='div'>
                            <p className={classes.card__title}>People fully vaccinated</p>
                            <p className={classes.card__body}>2,641,268,701</p>
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
            {/* <Grid container spacing={3} justifyContent="center">
                {summary.map(item => <HighlightCardContent key={item.type} type={item.type} title={item.title} total={item.total} />)}
            </Grid> */}
        </Grid>
    )
}

// const HighlightCardContent = ({ type, title, total }) => {
//     const classes = styles({ type })
//     return (
//         <Grid item sm={3} xs={12} >
//             <Card className={classes.root}>
//                 <CardContent className={classes.wrapper} >
//                     <Typography className={classes.title} component='p'>{title}</Typography>
//                     <Typography className={classes.total} component='p'>{total}</Typography>
//                 </CardContent>
//             </Card>
//         </Grid>
//     )
// }

const styles = makeStyles((theme) => ({
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
    },
    root: {
        '@media(min-width: 780px)': {
            width: '100%'
        }
    },
    block: {
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '1px solid #dadce0',
        borderRadius: 8
    },
    card__header: {
        fontSize: '1.375rem',
        fontFamily: "'Google Sans',sans-serif",
        fontWeight: 400,
        marginTop: theme.spacing(1.5),
        color: '#202124',
        paddingLeft: 5,
        '@media(min-width: 780px)': {
            paddingLeft: 12,
        },
    },
    card__title: {
        fontFamily: "'Roboto',sans-serif",
        color: '#5f6368',
        fontSize: '0.9rem',
        lineHeight: 1.3,
        marginBottom: theme.spacing(1)
    },
    card__body: {
        fontFamily: "'Google Sans',sans-serif",
        fontWeight: 500,
        color: '#202124',
        margin: '4px 0 8px',
        fontSize: 26,
        marginBottom: theme.spacing(2)
    },
    card__content: {
        textAlign: 'left',
        paddingLeft: 5,
        '@media(min-width: 780px)': {
            paddingLeft: 12,
        },
        alignItems: 'center',
    },
    card__block: {
        borderRight: '1px solid #dadce0',
        borderLeft: '1px solid #dadce0'
    },
    segmentation: {
        borderTop: '1px solid #dadce0',
        maxWidth: '98% !important',
    }
}))