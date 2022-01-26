import React from "react";
import Table from "./Table";
import fakeData from "../../constants/MOCK_DATA.json";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import SearchBar from "./SearchBar";

// {"id":1,"name":"Wine - White, Concha Y Toro","in_stock":47,"price":"$33.90","supplier":"Walter Group","sales":77,"image":"http://dummyimage.com/139x175.png/cc0000/ffffff"}

function StockManagment() {
  const columns: any = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className="m-3">
      <SearchBar
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <div className="mt-3 overflow-hidden bg-white rounded shadow-md">
        <div className="py-3">
          <h3 className="pt-2 pl-4 text-lg font-bold text-gray-700">
            Stock Management
          </h3>
        </div>
        <div className="">
          <Table
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            rows={rows}
            prepareRow={prepareRow}
          />
        </div>
      </div>
    </div>
  );
}

export default StockManagment;
