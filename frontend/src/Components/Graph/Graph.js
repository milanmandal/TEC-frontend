import React from 'react'
import { Line } from 'react-chartjs-2'

const Graph = ({stockData}) => {
    const dates = []
    const prices = []
    for (let index = 0; index < stockData.length; index++) {
        dates.push(stockData[index].date)
        prices.push(stockData[index].price)
    }

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Price',
                data: prices,
                borderColor: ['#3ecf82'],
                backgroundColor: ['rgba(247, 247, 247, 0.2)'],
                pointBackgroundColor: 'white'
            }
        ]
    }
    
    return (
        <div className='graph'>
            <Line data={data} />
        </div>
    )
}

export default Graph
