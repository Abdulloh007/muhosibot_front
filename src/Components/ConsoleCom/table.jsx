import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { startOfMonth, endOfMonth, addDays, format } from "date-fns";

// Function to generate random data
const generateRandomSpecificValue = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App = ({ filterVal }) => {
  const ChartRef = useRef(null);

  useEffect(() => {
    const createChart = () => {
      if (ChartRef.current) {
        if (ChartRef.current.chart) {
          ChartRef.current.chart.destroy();
        }

        const context = ChartRef.current.getContext("2d");

        // Generate labels and data for the last 30 days
        const currentDate = new Date();
        const firstDayOfMonth = startOfMonth(currentDate);
        const lastDayOfMonth = endOfMonth(currentDate);

        const labels = Array.from(
          { length: lastDayOfMonth.getDate() },
          (_, index) => {
            const date = addDays(firstDayOfMonth, index);
            return format(date, "dd");
          }
        );

        let filteredDatasets;

        if (filterVal === "Поступления") {
          filteredDatasets = [
            {
              label: "Поступления",
              data: labels.map(() => generateRandomSpecificValue(50000, 10000)),
              backgroundColor: "rgba(167, 116, 255, 0.6)",
              fill: true,
              borderRadius: 20,
            },
          ];
        } else if (filterVal === "Списания") {
          filteredDatasets = [
            {
              label: "Списания",
              data: labels.map(() => generateRandomSpecificValue(50000, 10000)),
              backgroundColor: "rgba(77, 137, 255, 0.6)",
              fill: true,
              borderRadius: 20,
            },
          ];
        } else {
          filteredDatasets = [
            {
              label: "Поступления",
              data: labels.map(() => generateRandomSpecificValue(50000, 10000)),
              backgroundColor: "rgba(167, 116, 255, 0.6)",
              fill: true,
              borderRadius: 20,
            },
            {
              label: "Списания",
              data: labels.map(() => generateRandomSpecificValue(50000, 10000)),
              backgroundColor: "rgba(77, 137, 255, 0.6)",
              fill: true,
              borderRadius: 20,
            },
          ];
        }

        const data = {
          labels: labels,
          datasets: filteredDatasets,
        };

        const newChart = new Chart(context, {
          type: "line",
          data: data,
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
              },
              tooltip: {
                mode: "index",
              },
            },
            interaction: {
              mode: "nearest",
              axis: "x",
              intersect: false,
            },
            scales: {
              y: {
                stacked: true,
              },
            },
          },
        });
        ChartRef.current.chart = newChart;
      }
    };

    createChart();
  }, [ChartRef, filterVal]);

  return (
    <div className="w-[70%] h-[400px] ">
      <canvas ref={ChartRef} />
    </div>
  );
};

export default App;
