import { SimpleCore } from "simple-core-state";

interface CoreObject {
  requestOptions: {
    url: string;
    method: "POST" | "GET" | "DELETE" | "PATCH";
  };
}

const instance = new SimpleCore<CoreObject>({
  requestOptions: {
    method: "POST",
    url: "",
  },
});

instance.persist(["requestOptions"]);

export const core = instance.core();
