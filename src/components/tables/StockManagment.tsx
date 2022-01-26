import React from "react";
import Table from "./Table";
import fakeData from "../../constants/MOCK_DATA.json";

// {"id":1,"name":"Wine - White, Concha Y Toro","in_stock":47,"price":"$33.90","supplier":"Walter Group","sales":77,"image":"http://dummyimage.com/139x175.png/cc0000/ffffff"}

function StockManagment() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "In Stock",
        accessor: "in_stock",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Supplier",
        accessor: "supplier",
      },
      {
        Header: "Sales",
        accessor: "sales",
      },
    ],
    []
  );
  const data = React.useMemo(() => fakeData, []);
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default StockManagment;
