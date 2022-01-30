import React from "react";
import { HiChevronDown } from "react-icons/hi";

function SelectInput({ children, ...props }: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) {
  return (
    <div className="relative inline-block w-full text-gray-700">
      <select
        className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border border-gray-300 rounded-lg appearance-none focus:shadow-outline"
        placeholder="Regular input"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export default SelectInput;
