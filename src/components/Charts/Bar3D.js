import React, { useState } from 'react'; 
import { AgCharts } from 'ag-charts-react';
 
const Bar3D = ({data}) => {
  const [options, setOptions] = useState({
    title: {
      text: 'Stars',
    },
    data: data,
    series: [
      {
        type: 'bar',
        direction: 'horizontal',
        xKey: 'label',
        yKey: 'value', 
      },
    ], 
  });

  return <AgCharts options={options} />;
};

export default Bar3D;
