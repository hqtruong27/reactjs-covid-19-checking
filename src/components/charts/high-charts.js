import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'
import Highchart from 'highcharts'
import moment from 'moment'
import _ from 'lodash'
// CaseFatalityRatio: 2.4909720807010394
// Continent: "Asia"
// Country: "Vietnam"
// CountryISO: "VN"
// DailyIncidenceConfirmedCases: 14600.714285714286
// DailyIncidenceConfirmedCasesPerMillion: 148.7305714285714
// DailyIncidenceConfirmedDeaths: 355.14285714285717
// DailyIncidenceConfirmedDeathsPerMillion: 3.6175714285714284
// Date: "2021-09-12T00:00:00Z"
// ID: "984ecfd1-8ad3-4d7d-99b8-63ab7b2c409a"
// IncidenceRiskConfirmedPerHundredThousand: 624.8165
// IncidenceRiskDeathsPerHundredThousand: 15.563999999999998
// IncidenceRiskNewConfirmedPerHundredThousand: 12.2503
// IncidenceRiskNewDeathsPerHundredThousand: 0.26589999999999997
// NewCases: 12026
// NewCasesPerMillion: 122.503
// NewDeaths: 261
// NewDeathsPerMillion: 2.659
// StringencyIndex: 0
// TotalCases: 613375
// TotalCasesPerMillion: 6248.165
// TotalDeaths: 15279
// TotalDeathsPerMillion: 155.64


//Run when data HighChart changes
const generateOptions = (data, country) => {

    const result = _(data)
        .groupBy(x => moment(x.Date).format('MM/YYYY'))
        .map((value, key) => ({
            key: key,
            data: value, NewCases: _(value).sumBy(x => x.NewCases)
        }))
        .value().sort(() => { const ASC = 1; return ASC })

    return {
        chart: {
            height: 550,
            type:'area'
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
                data: result.map(({ NewCases }) => NewCases)
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
