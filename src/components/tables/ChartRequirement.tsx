import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function ChartRequirement({
  height ,
  cr = 100,
}: {
  height?: number;
  cr?: number;
}) {
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
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        barHeight: "100%",
      },
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
   
  
  }));
  const [series] = React.useState([{ data: [123,112, cr] }]);
  return <div className="flex p-1 m-1"><Chart options={options} series={series} type="bar" height={`${height}px`} /></div>
}

export default ChartRequirement;
