import React, { useState } from 'react';
import { AgCharts } from 'ag-charts-react';

const Pie3D = ({ languages }) => {
  let newData = languages.map((el) => {
    return { asset: el.label, amount: +`${el.value}000` };
  });

  const [options, setOptions] = useState({
    data: newData,
    series: [
      {
        type: 'pie',
        angleKey: 'amount',
        calloutLabelKey: 'asset',
        sectorLabelKey: 'amount',
        fills: ['rgb(243, 243, 53)', 'orange', 'lightblue','pink','orangered'],
        sectorLabel: {
          color: 'black',
          fontWeight: 'bold',
          formatter: ({ value }) => `${(value / 1000).toFixed(0)}%`,
        },
        tooltip: {
          renderer: ({ datum }) => {
            let amount = datum.amount / 1000;
            return {
              content: `<div style="color: #fff; background-color: #333; padding: 10px; border-radius: 5px;">
                  <strong style="color: #ff6384;">${datum.asset}:</strong> 
                  <span style="color: #36a2eb;">${Math.floor(amount).toFixed(
                    0
                  )}%</span>
                </div>
`,
            };
          },
        },
      },
    ],
    background: {
      fill: '#b682e0',
    },
    title: {
      text: 'Language Popularity',
      fontSize: 20, 
      color: '#ffffff',
    },
  });

  return <AgCharts options={options} />;
};

export default Pie3D;
