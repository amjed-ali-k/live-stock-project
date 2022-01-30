import React from "react";
import { HeaderGroup, Row } from "react-table";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
function Table({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  prepareRow,
  rows,
  pageOptions,
  page,
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
}: {
  getTableProps: any;
  headerGroups: HeaderGroup<any>[];
  getTableBodyProps: any;
  prepareRow: any;
  rows: Row<any>[];
  pageOptions: any;
  page: Row<any>[];
  gotoPage: any;
  previousPage: any;
  nextPage: any;
  setPageSize: any;
  canPreviousPage: any;
  canNextPage: any;
  pageIndex: number;
}) {
  return (
    <>
      <table {...getTableProps()} className="w-full table-auto">
        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="align-middle outline-none"
            >
              <HeaderColumn column={headerGroup.headers[0]} />
              <HeaderColumn column={headerGroup.headers[1]} />
              <HeaderColumn column={headerGroup.headers[2]} />
              <th>C/R</th>
              <th>Requirements</th>
              <HeaderColumn column={headerGroup.headers[5]} />
              <HeaderColumn column={headerGroup.headers[3]} />
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="text-gray-700 bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400"
        >
          {page.map((row, i) => {
            prepareRow(row);
            return <TableRow row={row} {...row.getRowProps()} />;
          })}
        </tbody>
      </table>
      {rows.length > 0 ? (
        ""
      ) : (
        <div className="py-4 text-center">No items found</div>
      )}
      <div>
        <Pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
        />
      </div>
    </>
  );
}

export default Table;

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      {...props}
      className="w-full px-3 py-1 font-bold leading-tight border border-gray-200 rounded shadow appearance-none text-cyan-700 focus:outline-none focus:shadow-outline"
    ></input>
  );
});

function HeaderColumn({ column }: { column: any }) {
  return (
    <th
      {...column.getHeaderProps(column.getSortByToggleProps())}
      className="px-3 py-2"
    >
      <div className="flex items-center">
        <span>{column.render("Header")}</span>
        <span>
          {column.isSorted ? (
            column.isSortedDesc ? (
              <IoCaretDown className="pl-1 " />
            ) : (
              <IoCaretUp className="pl-1" />
            )
          ) : (
            ""
          )}
        </span>
      </div>
    </th>
  );
}

function TableRow({ row, ...props }: { row: any }) {
  const inputRef = React.createRef<HTMLInputElement>();
  const [val, setVal] = React.useState<string>();
  return (
    <tr
      {...props}
      className="hover:bg-slate-200 hover:bg-opacity-10"
      onClick={() => inputRef.current?.focus()}
    >
      {/* {row.cells.map((cell) => {
      return (
        <td {...cell.getCellProps()} className="px-4 py-1">{cell.render("Cell")}</td>
      );
    })} */}
      <td role="cell" className="text-center">
        {row.cells[0].render("Cell")}
      </td>
      <td role="cell" className="text-left">
        <div className="flex items-center">
          <div className="p-2 mr-2 text-green-500 bg-green-500 rounded-full bg-opacity-10">
            <MdLocalGroceryStore />
          </div>
          <div className="flex-grow">
            <div className="text-sm font-bold ">
              {row.cells[1].render("Cell")}
            </div>
            <div className="text-xs font-semibold text-gray-300">
              #{row.original.id}
            </div>
          </div>
        </div>
      </td>
      <td role="cell" className="">
        <div className="ml-2 text-lg font-semibold">
          {row.cells[2].render("Cell")}
        </div>
        <LevelIndicator value={row.original.in_stock} />
      </td>

      <td>
        <div className="w-20 text-sm">
          <TextInput
            ref={inputRef}
            type="text"
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) setVal(e.target.value);
              if (e.target.value.endsWith("%")) {
                const _val = e.target.value.slice(0, -1);
                const hist = Number(
                  row.original["requirements_history"]["last_month"]
                );
                let newVal = (hist * Number(_val)) / 100;
                // if(val.startsWith("-")) newVal = hist - newVal
                newVal = hist + newVal;
                if (newVal < 0) newVal = 0;
                newVal = Math.floor(newVal);
                setVal(Number(newVal).toString());
              }
              if (
                e.target.value.startsWith("-") &&
                !isNaN(Number(e.target.value.slice(1)))
              )
                setVal(e.target.value);
              if (
                e.target.value.startsWith("+") &&
                !isNaN(Number(e.target.value.slice(1)))
              )
                setVal(e.target.value);
            }}
            value={val}
            onBlur={(e) => {
              let _val = 0;
              if (e.target.value.startsWith("-")) {
                _val =
                  Number(row.original["requirements_history"]["last_month"]) -
                  Number(e.target.value.slice(1));
                if (Number(_val) > 0) setVal(_val.toString());
                else setVal("0");
              }
              if (e.target.value.startsWith("+")) {
                _val =
                  Number(e.target.value.slice(1)) +
                  Number(row.original["requirements_history"]["last_month"]);
                if (Number(_val) > 0) setVal(_val.toString());
                else setVal("0");
              }
            }}
          />
        </div>
      </td>
      <td>
        <div className="">
          <RequriementChart
            currentMonth={Number(val || 0)}
            lastMonth={row.original["requirements_history"]["last_month"]}
            lastYear={row.original["requirements_history"]["last_year_month"]}
          />
        </div>
      </td>
      <td role="cell" className="px-2 text-left">
        {row.cells[5].render("Cell")}
      </td>
      <td role="cell" className="text-center">
        {row.cells[3].render("Cell")}
      </td>
    </tr>
  );
}

function LevelIndicator({
  value,
  maxvalue = 100,
}: {
  value: number;
  maxvalue?: number;
}) {
  const percent = (value / maxvalue) * 100;
  if (percent > 30) {
    return (
      <div className="flex items-center">
        <div className="w-2 h-2 mr-1 bg-green-400 rounded-full"></div>
        <div className="text-[10px] font-semibold text-green-400">Good</div>
      </div>
    );
  }
  if (percent > 10) {
    return (
      <div className="flex items-center">
        <div className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></div>
        <div className="text-[10px] font-semibold text-yellow-500">Meduim</div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="w-2 h-2 mr-1 bg-red-600 rounded-full"></div>
      <div className="text-[10px] font-semibold text-red-600">Urgent</div>
    </div>
  );
}

function Pagination({
  pageIndex,
  pageOptions,
  gotoPage,
  canPreviousPage,
  canNextPage,
}: any) {
  function Butn({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) {
    return (
      <button
        onClick={() => onClick()}
        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
      >
        {children}
      </button>
    );
  }

  function Previous() {
    return (
      <div
        onClick={() => gotoPage(0)}
        className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
      >
        <GoChevronLeft />
      </div>
    );
  }

  function Next() {
    return (
      <div
        onClick={() => gotoPage(pageOptions.length - 1)}
        className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
      >
        <GoChevronRight />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center justify-between flex-1">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length} </span> page
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <Previous />
              {canPreviousPage && (
                <Butn onClick={() => gotoPage(pageIndex - 1)}>{pageIndex}</Butn>
              )}
              <Butn
                onClick={() => {
                  return;
                }}
              >
                {pageIndex + 1}
              </Butn>
              {canNextPage && (
                <Butn onClick={() => gotoPage(pageIndex + 1)}>
                  {pageIndex + 2}
                </Butn>
              )}
              <Next />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequriementChart({
  lastYear = 65,
  lastMonth = 54,
  currentMonth = 0,
}: {
  lastYear?: number;
  lastMonth?: number;
  currentMonth?: number;
}) {
  const maxVal = Math.max(lastYear, lastMonth, currentMonth);
  function Bar({
    v,
    m,
    className = "bg-blue-500",
  }: {
    v: number;
    m: number;
    className?: string;
  }) {
    return (
      <div className="flex items-center leading-none cursor-pointer group">
        <div className="mr-1 text-[11px] font-medium text-gray-500">
          {v < 10 && v >= 0 ? "0" + v : v}
        </div>
        <div className="w-full">
          <div
            style={{ width: `${(v / m) * 100}%` }}
            className={
              "h-[5px] rounded-lg group-hover:bg-opacity-80 " + className
            }
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Bar v={lastYear} m={maxVal} />
      <Bar v={lastMonth} m={maxVal} />
      <Bar v={currentMonth} m={maxVal} className="bg-green-500" />
    </div>
  );
}
