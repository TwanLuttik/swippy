import React, { useEffect, useRef } from "react";
import { useSimple } from "simple-core-state";
import { core } from "../core";

interface IRequestInputProps {}

const a = [{ variable: "HOST" }, { text: "random" }, { text: "test" }];

export const RequestInput: React.FC<IRequestInputProps> = () => {
  const requestOptions = useSimple(core.requestOptions);
  const ref = useRef<HTMLDivElement>(null);

  const check = (a: any) => {
    console.log("a", a.currentTarget.textContent);
  };

  return (
    <div className="bg-gray-200 py-2">
      <p
        className="outline-none"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e) => {
          check(e);
        }}
      >
        {a.map((item, index) => {
          if (item.variable) {
            return (
              <span
                contentEditable={false}
                className="p-1 bg-blue-200 mx-2  rounded-sm"
                key={index}
              >
                {item.variable}
              </span>
            );
          } else {
            return <React.Fragment key={index}>{item.text}</React.Fragment>;
          }
        })}
      </p>
    </div>
  );
};
