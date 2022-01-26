import React from "react";
import { HeaderGroup, Row } from "react-table";
import { IoCaretDown, IoCaretUp, IoCloudyNight } from "react-icons/io5";

function Table({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  prepareRow,
  rows,
}: {
  getTableProps: any;
  headerGroups: HeaderGroup<any>[];
  getTableBodyProps: any;
  prepareRow: any;
  rows: Row<any>[];
}) {
  const firstPageRows = rows.slice(0, 100);
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
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return <TableRow row={row} {...row.getRowProps()} />;
          })}
        </tbody>
      </table>
      {
        rows.length > 0 ? "" : <div className="py-4 text-center">No items found</div>
      }
    </>
  );
}

export default Table;

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
        <div className="mr-1 text-[11px] font-medium text-gray-500">{v}</div>
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
            <IoCloudyNight />
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
            type="number"
            onChange={(e) => setVal(e.target.value)}
            value={val}
          />
        </div>
      </td>
      <td>
        <div className="">
          <RequriementChart currentMonth={Number(val || 0)} />
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
