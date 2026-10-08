import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function AnalyticsChart({
  history
}) {
  const data = {
    labels: history.map(
      (item) =>
        new Date(
          item.hour_bucket
        ).toLocaleString()
    ),

    datasets: [
      {
        label: "Clicks",
        data: history.map(
          (item) => item.clicks
        )
      }
    ]
  };

  return (
    <div className="chart-container">
      <Bar data={data} />
    </div>
  );
}

export default AnalyticsChart;