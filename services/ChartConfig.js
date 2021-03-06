export const historyOptions = {
    lineHeightAnnotation: {
        always: true,
        hover: false,
        lineWeight: 1,
      },
    
      animation: {
        duration: 2000,
      },
      elements: {
        point:{
            radius: 0
        }
    },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "linear",
            parser: 'HH:mm:ss a',   
            unit: 'second',   
           
          },
        ],
      },

};
