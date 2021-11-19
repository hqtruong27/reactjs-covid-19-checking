import { /*Card, CardContent,*/ Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { CONSTANTS } from '../../global/constants'
import { Grid } from '@mui/material'

export const Highlight = ({ data }) => {
    let TOTAL_CASES = 0,
        TOTAL_DEATHS = 0,
        NEW_CASES = 0,
        TOTAL_DOES_GIVEN = 0,
        NEW_DOES_GIVEN = 0,
        PEOPLE_FULLY_VACCINATED = 0

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key]
            TOTAL_CASES += element.total_cases
            TOTAL_DEATHS += element.total_deaths
            NEW_CASES += element.new_cases
            TOTAL_DOES_GIVEN += element.total_vaccinations
            NEW_DOES_GIVEN += element.new_vaccinations
            PEOPLE_FULLY_VACCINATED += element.people_fully_vaccinated
        }
    }

    const COUNTRY_NAME = Object.keys(data).length > 1 ? 'Worldwide' : Object.values(data)[0]?.location

    const summary = [
        {
            title: 'Total cases',
            total: TOTAL_CASES?.toLocaleString() ?? 'No data',
            type: CONSTANTS.TYPE.CONFIRMED
        },
        {
            title: 'New cases (2 days)',
            total: NEW_CASES?.toLocaleString() ?? 'No data',
            type: CONSTANTS.TYPE.NEW_CASES,
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
            total: `+ ${NEW_DOES_GIVEN?.toLocaleString()}`  ?? 'No data',
            type: 'NEW_DOES_GIVEN'
        },
        {
            title: 'People fully vaccinated',
            total: PEOPLE_FULLY_VACCINATED?.toLocaleString() ?? 'No data',
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
                            <Typography className={`${classes.card__content} ${(item.type === CONSTANTS.TYPE.NEW_CASES ? classes.card__block : '')}`} component='div'>
                                <p className={classes.card__title}>{item.title}</p>
                                <p className={classes.card__body}>{item.total}</p>
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item sm={12} xs={12} className={classes.segmentation}></Grid>
                    {vaccines.map((item, index) => (
                        <Grid key={index} item sm={4} xs={4} >
                            <Typography className={`${classes.card__content} ${(item.type === 'NEW_DOES_GIVEN' ? classes.card__block : '')}`} component='div'>
                                <p className={classes.card__title}>{item.title}</p>
                                <p className={classes.card__body}>{item.total}</p>
                            </Typography>
                        </Grid>
                    ))}

                </Grid>
                <Grid container justifyContent="left">
                    <div className={classes.card_footer}>"Total doses given" shows the number of vaccine doses given to people. Since some vaccines require more than 1 dose, the number of fully vaccinated people is likely lower. "People fully vaccinated" shows how many people have received the full amount of doses for the COVID-19 vaccine.
                    </div>
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
    },
    card_footer: {
        fontSize: '0.85rem',
        marginBottom: '12px',
        lineHeight: 1.33,
        color: '#5f6368',
        paddingLeft: 5,
        '@media(min-width: 780px)': {
            paddingLeft: 12,
        },
        maxWidth: '95% !important',
    }
}))