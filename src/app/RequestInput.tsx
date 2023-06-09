import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSimple } from "simple-core-state";
import { core } from "../core";

interface IRequestInputProps {}

const a = [{ variable: "HOST" }, { text: "random" }, { text: "test" }];

export const RequestInput: React.FC<IRequestInputProps> = () => {
  const requestOptions = useSimple(core.requestOptions);
  const ref = useRef<HTMLDivElement>(null);
  const [varPreviewOpen, setVarPreviewOpen] = useState(false);

  const onInputChange = useCallback(
    (e: string) => {
      console.log("incoming string", e);
      if (e.endsWith("<")) {
        setVarPreviewOpen(true);
      } else {
        setVarPreviewOpen(false);
      }

      let x = requestOptions.url;
      console.log(x);

      if (!!x[x.length - 1].text) {
        console.log(x[x.length - 1]);
      } else {
        x.push({ text: e });
      }

      core.requestOptions.patchObject({ url: x });
    },
    [requestOptions.url]
  );

  const onVariableClick = useCallback(
    (e: string) => {
      let x = requestOptions.url;
      console.log(x);

      x.push({ variable: e });
      core.requestOptions.patchObject({ url: x });
    },
    [requestOptions]
  );

  const insertNewTxtblock = useCallback(() => {
    console.log("inserting new block??");
    let x = requestOptions.url;
    if (!x[x.length - 1] !== undefined) {
      x.push({ text: "" });
    }
    core.requestOptions.patchObject({ url: x });
  }, [requestOptions]);

  useEffect(() => {
    console.log(requestOptions.url);
  }, [requestOptions.url]);

  return (
    <div className="bg-gray-200 py-2 rounded-lg">
      {varPreviewOpen && (
        <VariablesPreviewBox onClick={(e) => onVariableClick(e)} />
      )}
      <div
        className="outline-none flex row bg-red-200"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onClick={() => {
          insertNewTxtblock();
        }}
        onInput={(e) => {
          onInputChange(e.currentTarget.textContent || "");
        }}
      >
        {requestOptions.url?.map((item, index) => {
          if (item.variable) {
            return (
              <span
                contentEditable={false}
                className="p-1 bg-blue-200 mx-2 rounded-sm cursor-pointer hover:bg-slate-400 select-none"
                key={index}
              >
                {item.variable}
              </span>
            );
          } else {
            return <p key={index}>{item.text}</p>;
          }
        })}
      </div>
    </div>
  );
};

interface IVariablesPreviewBoxProps {
  onClick: (e: string) => void;
}

const VariablesPreviewBox = (p: IVariablesPreviewBoxProps) => {
  const variables = useSimple(core.envVariables);
  const envs = useSimple(core.environments);

  return (
    <div className="absolute bg-slate-200 p-4">
      {Object.entries(variables[envs[0]]).map((item, index) => (
        <p
          onClick={() => p.onClick(item[0])}
          className="cursor-pointer hover:bg-slate-400"
        >
          {item[0]}
        </p>
      ))}
    </div>
  );
};
