import React, { useCallback, useState } from "react";
import { useSimple } from "simple-core-state";
import { core } from "../core";
import { IModalProps, Input, ModalComponent } from "../components";

export const GlobalVariables: React.FC<IModalProps<false>> = (props) => {
  const globalOptions = useSimple(core.globalOptions);
  const globalVariables = useSimple(core.envVariables);
  const envs = useSimple(core.environments);
  const [newVariable, setNewVariable] = useState<[string, string]>(["", ""]);

  const addVariable = useCallback(() => {
    let x = globalVariables;

    // Add the keys to the envs if not exists
    for (let item of envs) {
      if (x[item][newVariable[0]] === undefined) {
        if (globalOptions.currentEnv === item) {
          x[item][newVariable[0]] = newVariable[1];
        } else {
          x[item][newVariable[0]] = "";
        }
      }
    }

    core.envVariables.set(x);
    setNewVariable(["", ""]);
  }, [newVariable, globalOptions, envs, globalVariables]);

  const removeVariable = useCallback(
    (indexName: string) => {
      const x = globalVariables;

      for (let env of envs) {
        delete x[env][indexName];
      }

      core.envVariables.set(x);
    },
    [globalOptions, globalVariables]
  );

  const changeEnvironment = useCallback((e: string) => {
    core.globalOptions.patchObject({ currentEnv: e });
  }, []);

  return (
    <ModalComponent {...props}>
      <div className="mb-4">
        <p>Global Variables</p>
        <select
          className="w-[200px]"
          onChange={(e) => changeEnvironment(e.currentTarget.value)}
        >
          {envs.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {!globalVariables[globalOptions.currentEnv]?.length &&
        Object.entries(globalVariables[globalOptions.currentEnv]).map(
          (item, index) => (
            <div className="flex flex-row" key={index}>
              <p className="w-full">{item[0]}</p>
              <p className="w-full">{item[1]}</p>
              <button
                className="text-red-400"
                onClick={() => removeVariable(item[0])}
              >
                delete
              </button>
            </div>
          )
        )}
      <div className="flex flex-row mt-4">
        <Input
          value={newVariable[0]}
          onChange={(e) => setNewVariable((x) => [e, x[1]])}
        />

        <Input
          className="ml-4"
          value={newVariable[1]}
          onChange={(e) => setNewVariable((x) => [x[0], e])}
        />
        <button
          onClick={() => {
            addVariable();
          }}
        >
          add
        </button>
      </div>
    </ModalComponent>
  );
};
