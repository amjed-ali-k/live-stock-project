import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import StockManagment from "./components/tables/StockManagment";
ReactDOM.render(
  <React.StrictMode>
    <div className="bg-gray-100">

    <div className="container mx-auto">
    <StockManagment />
    </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
