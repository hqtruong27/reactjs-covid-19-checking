import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'
import Highchart from 'highcharts'
import moment from 'moment'
import _ from 'lodash'


//Run when data HighChart changes
const generateOptions = (data, country) => {
    const result = _(data)
        .groupBy(x => moment(x.Date).format('MM/YYYY'))
        .map((value, key) => ({ key: key, data: value, Confirmed: value[value.length - 1].Confirmed })).value()
        .sort(() => { const ASC = 1; return ASC })
    console.log(result);
    return {
        chart: {
            height: 550,
        },
        title: {
            text: `<h1 style='font-size:27px'>Cases</h1><br/><br/><span style='color:#545454'>${country}</span>`,
            align: 'left'
        },
        // subtitle: {
        //     text: '1234<br/>3456',
        // },
        xAxis: {
            categories: result.map(({ key }) => key),
            crosshair: true,
            // title: {
            //     text: 'Total'
            // }
        },
        colors: ['#F3585B'],
        yAxis: {
            min: 0,
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
                name: 'Total: ',
                data: result.map(({ Confirmed }) => Confirmed)
            }
        ]
    }
}

const HighChart = ({ data }) => {
    const [options, setOptions] = useState({})

    useEffect(() => {
        const country = data[data.length - 1]?.Country ?? ''
        setOptions(generateOptions(data, country))
    }, [data])

    return (
        <div>
            <HighchartsReact highcharts={Highchart} options={options} />
        </div>
    )
}

export default HighChart
