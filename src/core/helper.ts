import { ModalNames } from "../components";
import { core } from "./core";

export const openModal = (name: ModalNames, data?: any) => {
  core._events.modal.send({ name, data });
};

export const initialAppRun = () => {
  // Create all variable groups to prevent issuer
  let envList = core.environments._value;
  let variables = core.envVariables._value;

  for (let item of envList) {
    console.log("x", variables[item]);
    if (variables[item] === undefined) {
      variables[item] = {};
    }
  }

  core.envVariables.set(variables);
};
