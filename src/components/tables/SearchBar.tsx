import React from "react";
import { useAsyncDebounce } from "react-table";
import { HiOutlineSearch } from "react-icons/hi"; 

function SearchBar({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: {
  preGlobalFilteredRows: any[];
  globalFilter: string;
  setGlobalFilter: (value?: string) => void;
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((v: string) => {
    setGlobalFilter(v || undefined);
  }, 200);
  return (
    <div className="flex w-full px-3 py-3 leading-tight bg-white border border-gray-200 rounded shadow appearance-none text-cyan-700 focus:outline-1 focus:shadow-outline">
     <HiOutlineSearch  size={20} className="mr-2"/>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        className="w-full focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
