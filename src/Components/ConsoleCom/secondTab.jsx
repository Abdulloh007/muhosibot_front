import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { startOfMonth, endOfMonth, addDays, format, isMonday } from "date-fns";

// Function to generate random data

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const SecondApp = () => {
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
            return isMonday(date) ? format(date, "dd") : ""; // Only include Mondays
          }
        ).filter(Boolean);

        const labelsWithData = labels.map((label) => ({
          label: label,
          value: 0,
        }));

        const data = {
          labels: labels,
          datasets: [
            {
              label: "Продажи",
              data: labelsWithData.map(
                (entry) => (entry.value = randomInt(1, 120))
              ),
              backgroundColor: "#4D89FF",
              fill: true,
            },
            {
              label: "Новые клиенты",
              data: labelsWithData.map(
                (entry) => (entry.value = randomInt(1, 120))
              ),
              backgroundColor: "#1ACC79",
              fill: true,
            },
          ],
        };

        const newChart = new Chart(context, {
          type: "bar",
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
            scales: {
              x: {
                type: "category",
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        ChartRef.current.chart = newChart;
      }
    };

    createChart();
  }, [ChartRef]);

  return (
    <div className="h-[400px] w-[30%]">
      <canvas ref={ChartRef} style={{ height: 400, width: "100%" }} />
    </div>
  );
};

export default SecondApp;
