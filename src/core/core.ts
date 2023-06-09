import { SimpleCore } from "simple-core-state";

type BlockTypes = Partial<{
  text: string;
  variable: string;
}>;

interface CoreObject {
  requestOptions: {
    url: BlockTypes[];
    method: "POST" | "GET" | "DELETE" | "PATCH";
  };
  globalOptions: {
    currentEnv: string;
  };
  environments: string[];
  envVariables: {
    [index: string]: {
      [index: string]: string;
    };
  };
}

const instance = new SimpleCore<CoreObject>({
  requestOptions: {
    method: "POST",
    url: [],
  },
  globalOptions: {
    currentEnv: "local",
  },
  environments: ["local"],
  envVariables: {
    local: {},
  },
});

instance.persist([
  "requestOptions",
  "envVariables",
  "globalOptions",
  "environments",
]);

instance.events.create(["modal"]);

export const core = instance.core();
