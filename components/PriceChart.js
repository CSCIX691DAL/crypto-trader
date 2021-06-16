import React, { useEffect, useRef, useState } from 'react'
import Chartjs from 'chart.js'
import { historyOptions } from '../services/ChartConfig';


const PriceChart = ({data}) => {
    const chartRef = useRef()
    const{day,week,month} = data
    const [time, setTimeFormat] = useState("24h");

    const determineTimeFormat = () => {
        

    if(time === "24h"){
        return day
    }
    else if(time === "7d"){
        return week
    }
    else if(time === "1Y"){
        return month 
    }
       
      };

    useEffect(() => {
        if(chartRef && chartRef.current){
            const chartInstance = new Chartjs(chartRef.current, {
                type: 'line', 
                data: {
                    labels: "price",
                    datasets :[
                        {
                            data: determineTimeFormat(),
                      
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
        <div className= "bg-white border mt-2 rounded p-3">
        <div>
  
            <canvas ref={chartRef} id= "myChart" width ={300} height = {300}></canvas>
        </div>
        <div className="chart-button mt-1">
    
        <button
          onClick={() => setTimeFormat("24h")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded"
        >
          24h
        </button>
        <button
          onClick={() => setTimeFormat("7d")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded"
        >
          7d
        </button>
        <button
          onClick={() => setTimeFormat("1Y")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded"
        >
          1Y
        </button>
      </div>
    </div>
       
    )
};

export default PriceChart

