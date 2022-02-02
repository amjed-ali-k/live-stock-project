import React from "react";
import Chart from "../chart";
import { FaCoins } from "react-icons/fa";
import { IconType } from "react-icons";
import { BiPackage } from "react-icons/bi";
import { IoPricetags } from "react-icons/io5";
function ProductInfo({
  name,
  image = "https://picsum.photos/300/200",
  price,
  description,
  instock,
  sales,
  id,
}: {
  name: string;
  image: string;
  price: number;
  description: string;
  instock: string;
  sales: string;
  id: string;
}) {
  return (
    <div>
      <div className="flex p-4">
        <div className="items-start flex-grow-0 w-1/2 lg:flex">
          <div className="lg:w-1/2">
            <div className="relative h-40 pb-2 overflow-hidden rounded-md lg:pb-0 ">
              <img
                className="absolute inset-0 object-cover w-full h-full"
                src={image}
              />
            </div>
            <div className="flex justify-center">
            <StatsWithIcon text="Sales" icon={FaCoins} value={sales} />
            <StatsWithIcon text="In Stock" icon={BiPackage} value={instock} />
            <StatsWithIcon text="Price" icon={IoPricetags} value={price.toString()} />   
            </div>
          </div>
          <div className="lg:w-1/2 lg:px-2">
            <h2 className="text-xl font-bold text-center text-gray-700 lg:text-left">
              {name}
            </h2>
            <p className="text-sm ">{description}</p>
          </div>
        </div>
        <div className="flex-grow w-96">
          <h2 className="font-bold text-center text-gray-500">
            Requirements History
          </h2>
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;

function StatsWithIcon({
  text,
  icon,
  value,
}: {
  text: string;
  icon: IconType;
  value: string;
}) {
  const Icon = icon;
  return (
    <div>
      <div className="flex items-center px-2 mx-1 mt-3 text-sm font-bold text-gray-500">
        <Icon className="mr-1" size={25} /> {text}
      </div>
      <p className="text-xl font-bold text-center text-gray-700">{value}</p>
    </div>
  );
}
