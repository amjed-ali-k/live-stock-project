import Chart from "react-apexcharts";
import React from "react";
import { getNumberArray } from "../../constants/getChartData";
import { ApexOptions } from "apexcharts";

function ChartColumn({ height = 150 }: { height?: number }) {
  const [series] = React.useState(() => [
    { name: "Sales", data: getNumberArray() },
  ]);
  const [options] = React.useState<ApexOptions>(() => ({
    chart: {
      height: height,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: [2]
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
    },
  }));
  return <Chart options={options} series={series} type="area" height={height} />;
}

export default ChartColumn;
