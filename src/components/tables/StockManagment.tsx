import React from "react";
import Table from "./Table";
import fakeData from "../../constants/MOCK_DATA.json";
import {
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
} from "react-table";
import SearchBar from "./SearchBar";
import SelectInput from "./SelectInput";

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
      {
        Header: "Depot",
        accessor: "depot_id",
        Filter: DepotFilter,
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
    pageOptions,
    page,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <div className="m-3">
      <SearchBar
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <div className="flex items-center">
        <div className="my-2 w-52">
          <div className="mb-2 text-sm text-gray-600">Items Per page:</div>
          <SelectInput
            value={state.pageSize}
            onChange={(v) => {
              setPageSize(Number(v.target.value));
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </SelectInput>
        </div>
        <div className="mx-2 w-52">
          <DepotFilter column={headerGroups[0].headers[6]} />
        </div>
      </div>

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
            pageOptions={pageOptions}
            page={page}
            gotoPage={gotoPage}
            previousPage={previousPage}
            nextPage={nextPage}
            setPageSize={setPageSize}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageIndex={state.pageIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default StockManagment;

function DepotFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: {
  column: {
    filterValue: string;
    setFilter: (e?: string) => void;
    preFilteredRows: any[];
    id: string;
  };
}) {
  const depotIds = ["CAN-01", "KSD-11", "MLP-03", "KKD-11", "MLP-01", "CAN-04"];
  console.log({ filterValue, setFilter, preFilteredRows, id });
  // Render a multi-select box
  return (
    <>
      <div className="px-2 mb-2 text-sm text-gray-600">Select Depot: </div>
      <SelectInput
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {depotIds.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </SelectInput>
    </>
  );
}
