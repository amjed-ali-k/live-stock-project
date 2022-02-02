import React from 'react';
import AreaLine from './AreaLine';

const data = [
  {
    id: "Sales",
    color: "hsl(114 100% 18%)",
    data: [
      {
        x: "January",
        y: 97,
      },
      {
        x: "February",
        y: 129,
      },
      {
        x: "March",
        y: 254,
      },
      {
        x: "April",
        y: 61,
      },
      {
        x: "May",
        y: 173,
      },
      {
        x: "June",
        y: 67,
      },
      {
        x: "July",
        y: 289,
      },
      {
        x: "August",
        y: 225,
      },
      {
        x: "September",
        y: 107,
      },
      {
        x: "October",
        y: 237,
      },
      {
        x: "November",
        y: 72,
      },
      {
        x: "December11",
        y: 233,
      },
    ],
  },
];

function index() {
  return <div className='h-40'>
      <AreaLine data={data} />
  </div>;
}

export default index;
