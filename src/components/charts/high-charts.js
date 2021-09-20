import moment from 'moment'
import Highchart from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { FormControl, makeStyles, NativeSelect } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    filter: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.spacing(2),
        '@media(min-width: 780px)': {
            flexFlow: 'row',
        },
    },
    selector: {
        '@media(min-width: 780px)': {
            width: 136
        },
    }
}))

//Run when data HighChart changes
const generateOptions = (type, data, country) => {
    const { result, categories, typeChart } = generateDataByType(type, data)
    return {
        chart: {
            height: 550,
            borderColor: '#dadce0',
            borderWidth: 1,
            borderRadius: 8,
        },
        title: {
            y: 20,
            text: `<h1 style='font-size:27px;margin-top:10px'>Cases</h1><br/><br/><span style='color:#545454'>${country}</span>`,
            align: 'left'
        },
        // subtitle: {
        //     text: '1234<br/>3456',
        // },
        xAxis: {
            categories: categories,
            crosshair: true,
            minColor: '#FFFFFF',
            maxColor: '#000000',
            // title: {
            //     text: 'Total'
            // }
        },
        colors: ['#8bbc21'],
        colorAxis: {
            minColor: '#333'
        },
        yAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: '#000000',
            title: {
                text: 'Total cases'
            },
            labels: {
                align: 'right'
            },


        },
        tooltip: {
            headerFormat: '<span style="" ></span><table>',
            bodyFormat: '<tr><td>{1}</td><td>{2}</td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'New Cases: ',
                type: typeChart,
                data: result?.map(({ NewCases }) => NewCases)
            }
        ],
        credits: {
            enabled: false
        }
    }
}
const generateDataByType = (type = 'all', data) => {
    let result, categories, typeChart = 'area'
    switch (type) {
        case "7":
            result = data.map(item => ({
                Date: moment(item.Date).format('DD/MM/YYYY'),
                NewCases: item.NewCases
            })).sort(() => { const ASC = 1; return ASC })
            categories = result.map(({ Date }) => Date)
            typeChart = 'column'
            break
        case "14":
            result = data.map(item => ({
                Date: moment(item.Date).format('DD/MM/YYYY'),
                NewCases: item.NewCases
            })).sort(() => { const ASC = 1; return ASC })
            categories = result.map(({ Date }) => Date)
            typeChart = 'column'
            break
        case "30":
            result = data.map(item => ({
                Date: moment(item.Date).format('DD/MM/YYYY'),
                NewCases: item.NewCases
            })).sort(() => { const ASC = 1; return ASC })
            categories = result.map(({ Date }) => Date)
            typeChart = 'column'
            break
        default:
            result = _(data)
                .groupBy(x => moment(x.Date).format('MM/YYYY'))
                .map((value, key) => ({
                    key: key,
                    data: value, NewCases: _(value).sumBy(x => x.NewCases)
                }))
                .value().sort(() => { const ASC = 1; return ASC })
            categories = result.map(({ key }) => key)
            break
    }

    return { result, categories, typeChart }
}

const HighChart = ({ value, onChange, data }) => {

    const [options, setOptions] = useState({})

    useEffect(() => {
        const country = data[data.length - 1]?.Country ?? ''
        setOptions(generateOptions(data.type, data.data, country))
    }, [data])

    const classes = useStyles()
    return (
        <div>
            <FormControl className={classes.filter}>
                <NativeSelect
                    value={value || ''}
                    onChange={onChange}
                    className={classes.selector}>
                    <option value="all" >All time</option>
                    <option value={7}>Last 7 Days</option>
                    <option value={14}>Last 14 Days</option>
                    <option value={30}>Last 30 Days</option>
                </NativeSelect>
            </FormControl>
            <HighchartsReact highcharts={Highchart} options={options} />
        </div >
    )
}

export default HighChart