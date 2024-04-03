import { useState } from "react";
import { createContainer } from "unstated-next";
import { FMSName, FMSValue, Side } from "../logic/coordinatesLogic";

export interface Result {
  DP?: FMSValue;
  SM?: { [side: string]: FMSValue };
  IL?: { [side: string]: FMSValue };
  ASLR?: { [side: string]: FMSValue };
  RS?: { [side: string]: FMSValue };
  TSP?: FMSValue;
}

const useResultStore = () => {
  const [values, setValues] = useState<Result>({});

  const value = (name: FMSName, side: Side): FMSValue | undefined => {
    switch (name) {
      case "DP":
      case "TSP":
        if (typeof values[name] === "number") {
          return values[name];
        } else {
          throw Error("invalid value: " + name);
        }
      case "SM":
      case "IL":
      case "ASLR":
      case "RS":
        if (!values[name] || typeof values[name] === "object") {
          const v = values[name];
          if (v) {
            return v[String(side)];
          } else {
            return undefined;
          }
        } else {
          throw Error("invalid value: " + name);
        }
      default:
        throw Error("invalid name: " + name);
    }
  };

  const setValue = (name: FMSName, side: Side, val: FMSValue) => {
    switch (name) {
      case "DP":
      case "TSP":
        values[name] = val;
        break;
      case "SM":
      case "IL":
      case "ASLR":
      case "RS":
        if (side) {
          let v: { [side: string]: FMSValue } | undefined = values[name];
          if (!v) {
            v = {};
          }
          v[String(side)] = val;
          values[name] = v;
          break;
        }
        throw Error("invalid side: " + side);
      default:
        throw Error("invalid name: " + name);
    }
    setValues({ ...values });
  };
  return { value, setValue };
};

export const ResultStore = createContainer(useResultStore);
