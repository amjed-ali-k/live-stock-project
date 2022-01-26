import React from "react";
import { useAsyncDebounce } from "react-table";
import TextInput from "../ui/forms/TextInput";

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
    <TextInput
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`${count} records...`}
    />
  );
}

export default SearchBar;
