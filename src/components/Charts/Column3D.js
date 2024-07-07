import React, { useState, useEffect } from 'react'; 
import { AgCharts } from 'ag-charts-react';

const Column3D = ({ data }) => {
  const [options, setOptions] = useState({
    title: {
      text: 'Repos',
    },
    data: data,
    series: [
      {
        type: 'bar',
        direction: 'horizontal',
        xKey: 'label',
        yKey: 'value',
        fill: '#b682e0',
      },
    ],
  });

  return <AgCharts options={options} />;
};

export default Column3D;
