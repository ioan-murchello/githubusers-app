
import React, { useState } from 'react';
import { AgCharts } from 'ag-charts-react';

const Doughnut2D = ({ data }) => {
  const newData = data.map((el) => ({
    asset: el.label,
    amount: el.stars,
  }));

  const [options, setOptions] = useState({
    data: newData,
    title: {
      text: 'Per stars',
    },
    series: [
      {
        type: 'donut',

        calloutLabelKey: 'asset',
        angleKey: 'amount', 
        innerRadiusRatio: 0.4,
        fills: ['yellow', 'orange', 'lightblue','orangered','violet','purple'],
        sectorLabel: {
          color: 'black',
          fontWeight: 'bold',
          formatter: ({ value }) => `${value / 1000}`,
        },
      },
    ],
    background: {
      fill: '#5bdfa1',
    },
  });

  return <AgCharts options={options} />;
};

export default Doughnut2D;
