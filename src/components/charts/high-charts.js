import HighchartsReact from 'highcharts-react-official'
import React, { ReactElement, useEffect, useState } from 'react'
import Highchart from 'highcharts'

//Run when data HighChart changes
const generateOptions = (data) => {
    const categories = []
    return {
        Chart: {
            height: 500,
        },
        title: {
            text: 'Total'
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        colors: ['#CBA4E4'],
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            // labels: {
            //     align: 'right'
            // }
            tooltip: {
                headerFormat: '<span style="" ></span><table>',
                bodyFormat: '<tr><td>{1}</td><td>{2}</td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                columns: {
                    pointPadding: 0.2,
                    borderWidth: 0.1
                }
            },
            series: [
                {
                    name: 'Total: ',
                    data: data.map((x) => x)
                }
            ]
        }

    }
}

function HighChart({ data }) {
    const [options, setOptions] = useState({})

    useEffect(() => {
        setOptions(generateOptions(data))

    }, data)

    return (
        <div>
            <HighchartsReact highcharts={Highchart} options={generateOptions} />
        </div>
    )
}

export default HighChart
