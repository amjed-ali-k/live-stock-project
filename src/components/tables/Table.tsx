import React from "react";
import {
  HeaderGroup,
  Row,
} from "react-table";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import ChartColumn from "./ChartColumn";

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

  const firstPageRows = rows.slice(0, 10);
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="flex items-center">
                    <span>{column.render("Header")}</span>
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <IoCaretDown className=" pl-1" />
                        ) : (
                          <IoCaretUp className="pl-1" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </th>
              ))}
              <th>History</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td><ChartColumn height={100}/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
