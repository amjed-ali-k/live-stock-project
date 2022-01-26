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
    <div>
      <SearchBar
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <Table
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
      />
    </div>
  );
}

export default StockManagment;
