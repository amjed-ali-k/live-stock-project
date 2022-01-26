import React from "react";

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
      className="w-full px-3 py-1 leading-tight border border-gray-200 rounded shadow appearance-none text-cyan-700 focus:outline-none focus:shadow-outline"
    ></input>
  );
});

export default TextInput;
