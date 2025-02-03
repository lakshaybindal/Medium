import React from "react";

export default function Input(props: {
  label: string;
  type: string;
  placeholder: string;
  set: (value: string) => void;
}) {
  return (
    <div className="mb-4 w-full">
      <label className="block font-semibold mb-1">{props.label}</label>
      <input
        onChange={(e) => props.set(e.target.value)}
        type={props.type}
        placeholder={props.placeholder}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
