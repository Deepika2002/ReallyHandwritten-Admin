import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const DonutChart = ({ totalContacts, totalCardsSent, pending }) => {
  Chart.register(...registerables); // Register necessary chart types and plugins

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      // Destroy previous chart instance if it exists
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    const newChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Total Contacts', 'Gift Cards Sent', 'Pending'],
        datasets: [
          {
            data: [totalContacts, totalCardsSent, pending],
            borderColor: ['rgb(75, 192, 192)', 'rgb(255, 205, 86)', 'rgb(255, 99, 132)'],
            backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 205, 86)', 'rgb(255, 99, 132)'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    });

    chartInstanceRef.current = newChartInstance;
  }, [totalContacts, totalCardsSent, pending]);

  return (
    <>
      {/* Doughnut chart */}
      <div className="flex justify-center w-[500px] h-screen flex mt-2 mx-auto my-auto">
        <div className="  rounded-xl w-full h-fit my-auto  pb-2">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </>
  );
};

export default DonutChart;
