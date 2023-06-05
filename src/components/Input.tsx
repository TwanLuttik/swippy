import React from "react";

interface IInputProps {
  value: string;
  onChange: (e: string) => void;
  className?: string;
}

export const Input: React.FC<IInputProps> = (p) => {
  return (
    <input
      className={
        "border-solid border-gray-300 border-[1px] rounded-md outline-none focus:border-blue-300 px-1.5 py-0.5 " +
        p.className
      }
      onChange={(e) => p.onChange(e.currentTarget.value)}
    />
  );
};
