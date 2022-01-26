import React from "react";
import {
  HeaderGroup,
  Row,
} from "react-table";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";

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
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
