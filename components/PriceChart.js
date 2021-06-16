import React, { useEffect, useRef } from 'react'
import Chartjs from 'chart.js'
import { historyOptions } from '../services/ChartConfig';


const PriceChart = ({data}) => {
    const chartRef = useRef()
    const{day,week,month} = data

    useEffect(() => {
        if(chartRef && chartRef.current){
            const chartInstance = new Chartjs(chartRef.current, {
                type: 'line', 
                data: {
                    labels: "price",
                    datasets :[
                        {
                            data: month,
                      
                            },
                    ],
                    pointRadius: 0,
                    
                },
                options: {
                    ...historyOptions,
                },
            } );
        }

    })
    return (
        <div className= "bg-white border mt-5 rounded p-3">
        <div>
  
            <canvas ref={chartRef} id= "myChart" width ={200} height = {200}></canvas>
        </div>
        </div>
    )
};

export default PriceChart

