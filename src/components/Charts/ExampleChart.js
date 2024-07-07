import React, { useState } from 'react';
import { AgCharts } from 'ag-charts-react';

const ExampleChart = () => {
  const [options, setOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [
      { language: 'HTML', avgTemp: 2.3, percent: 23 },
      { language: 'CSS', avgTemp: 2.3, percent: 13 },
      { language: 'JAVASCRIPT', avgTemp: 2.3, percent: 70 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ type: 'bar', xKey: 'language', yKey: 'percent' }],
  });

  return <AgCharts options={options} />;
};
export default ExampleChart;