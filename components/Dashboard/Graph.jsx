import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const Graph = ({ risk, diversity, stability }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Risk', 'Diversity', 'Stability'],
        datasets: [{
          label: 'Portfolio',
          data: [1, 10, 50],
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light green fill
          borderColor: 'rgba(255, 99, 132, 1)',  // Green border
          pointRadius: 5,
          pointHitRadius: 10,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',  // Green points
          pointBorderColor: 'rgba(255, 99, 132, 1)',
          pointBorderWidth: 1,
        }],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true,
              color: 'rgba(255, 255, 255, 0.8)', // White with some opacity
              beginAtZero: true,
            },
            gridLines: {
              display: true,
              color: 'rgba(255, 255, 255, 0.8)', // White with some opacity
              beginAtZero: true,
            },
            pointLabels: {
              display: true, // Show labels around the chart
              color: 'rgba(255, 255, 255, 0.8)',  // White with some opacity
              fontSize: 16, // Adjust font size as needed
              lineWidth: 2, // Adjust line width for labels (optional)
              borderColor: 'rgba(150, 150, 150, 0.8)', // Light gray border (optional)
              beginAtZero: true,
            },
            ticks: {
              display: false, // Hide numbers in the middle
              beginAtZero: true,
              max: 100,
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function (optional)
    return () => {
      if (myChart) {
        myChart.destroy(); // Clean up chart instance on component unmount
      }
    };
  }, [risk, diversity, stability]);

  return <canvas ref={chartRef} width={400} height={400} />; // Adjust width/height as needed
};

export default Graph;