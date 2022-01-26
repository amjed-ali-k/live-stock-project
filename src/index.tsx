import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import StockManagment from "./components/tables/StockManagment";
ReactDOM.render(

    <div className="bg-gray-100">

    <div className="container mx-auto">
    <StockManagment />
    </div>
    </div>
,
  document.getElementById("root")
);
