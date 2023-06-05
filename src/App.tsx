import { useSimple } from "simple-core-state";
import { core } from "./core";
import { openModal } from "./core/helper";
import { RequestInput } from "./app/RequestInput";

export const App = () => {
  const reqConfig = useSimple(core.requestOptions);

  return (
    <div className="container p-6">
      <RequestInput />

      <p className="text-lg text-green-700">{JSON.stringify(reqConfig)}</p>
      <select className="w-[200px]">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="DELETE">DELETE</option>
        <option value="PATCH">PATCH</option>
      </select>

      <button onClick={() => openModal("GlobalVariables")}>
        open variables
      </button>
    </div>
  );
};
