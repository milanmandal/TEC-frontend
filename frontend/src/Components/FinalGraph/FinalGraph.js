import React from 'react';
import { Line } from 'react-chartjs-2';

const FinalGraph = ({stockData, color}) => {
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
                data: prices.slice(0,8),
                borderColor: 'gray',
                pointBackgroundColor: 'white'
            },
            {
                label: 'Price',
                data: [null, null, null, null, null, null, null, prices[7], prices[8], prices[9], prices[10], prices[11], prices[12]],
                borderColor: color,
                pointBackgroundColor: 'white'
            },
        ]
    }

    return (
        <div className='graph'>
            <Line data={data} />
        </div>
    )
}

export default FinalGraph;