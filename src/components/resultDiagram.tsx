import { Circle, Group } from "react-konva";
import { Result, ResultStore } from "../stores/resultStore";
import { useEffect, useState } from "react";
import {
  CenterPoint,
  Coordinates,
  calcCoordinates,
} from "../logic/coordinatesLogic";

interface _props {
  centerPoint: CenterPoint;
}

const ResultDiagram = (props: _props) => {
  const resultStore = ResultStore.useContainer();
  const [result, setResult] = useState<Result>(resultStore.allValues());

  const [DP_coord, setDP] = useState<Coordinates>();
  const [SM_L_coord, setSM_L] = useState<Coordinates>();
  const [SM_R_coord, setSM_R] = useState<Coordinates>();
  const [IL_L_coord, setIL_L] = useState<Coordinates>();
  const [IL_R_coord, setIL_R] = useState<Coordinates>();
  const [ASLR_L_coord, setASLR_L] = useState<Coordinates>();
  const [ASLR_R_coord, setASLR_R] = useState<Coordinates>();
  const [RS_L_coord, setRS_L] = useState<Coordinates>();
  const [RS_R_coord, setRS_R] = useState<Coordinates>();
  const [TSP_coord, setTSP] = useState<Coordinates>();

  useEffect(() => {
    setResult(resultStore.allValues());
  }, [resultStore]);

  useEffect(() => {
    setDP(
      result.DP
        ? calcCoordinates("DP", null, props.centerPoint, result.DP)
        : undefined
    );
    setSM_L(
      result.SM && result.SM["L"]
        ? calcCoordinates("SM", "L", props.centerPoint, result.SM["L"])
        : undefined
    );
    setSM_R(
      result.SM && result.SM["R"]
        ? calcCoordinates("SM", "R", props.centerPoint, result.SM["R"])
        : undefined
    );
    setIL_L(
      result.IL && result.IL["L"]
        ? calcCoordinates("IL", "L", props.centerPoint, result.IL["L"])
        : undefined
    );
    setIL_R(
      result.IL && result.IL["R"]
        ? calcCoordinates("IL", "R", props.centerPoint, result.IL["R"])
        : undefined
    );
    setASLR_L(
      result.ASLR && result.ASLR["L"]
        ? calcCoordinates("ASLR", "L", props.centerPoint, result.ASLR["L"])
        : undefined
    );
    setASLR_R(
      result.ASLR && result.ASLR["R"]
        ? calcCoordinates("ASLR", "R", props.centerPoint, result.ASLR["R"])
        : undefined
    );
    setRS_L(
      result.RS && result.RS["L"]
        ? calcCoordinates("RS", "L", props.centerPoint, result.RS["L"])
        : undefined
    );
    setRS_R(
      result.RS && result.RS["R"]
        ? calcCoordinates("RS", "R", props.centerPoint, result.RS["R"])
        : undefined
    );
    setTSP(
      result.TSP
        ? calcCoordinates("TSP", null, props.centerPoint, result.TSP)
        : undefined
    );
  }, [props.centerPoint, result]);

  return (
    <Group>
      {
        // まずは各circle
        // 続いて、Line
      }
      {DP_coord && (
        <Circle x={DP_coord[0]} y={DP_coord[1]} radius={4} stroke="red" />
      )}
      {SM_L_coord && (
        <Circle x={SM_L_coord[0]} y={SM_L_coord[1]} radius={4} stroke="red" />
      )}
      {SM_R_coord && (
        <Circle x={SM_R_coord[0]} y={SM_R_coord[1]} radius={4} stroke="red" />
      )}
      {IL_L_coord && (
        <Circle x={IL_L_coord[0]} y={IL_L_coord[1]} radius={4} stroke="red" />
      )}
      {IL_R_coord && (
        <Circle x={IL_R_coord[0]} y={IL_R_coord[1]} radius={4} stroke="red" />
      )}
      {ASLR_L_coord && (
        <Circle
          x={ASLR_L_coord[0]}
          y={ASLR_L_coord[1]}
          radius={4}
          stroke="red"
        />
      )}
      {ASLR_R_coord && (
        <Circle
          x={ASLR_R_coord[0]}
          y={ASLR_R_coord[1]}
          radius={4}
          stroke="red"
        />
      )}
      {RS_L_coord && (
        <Circle x={RS_L_coord[0]} y={RS_L_coord[1]} radius={4} stroke="red" />
      )}
      {RS_R_coord && (
        <Circle x={RS_R_coord[0]} y={RS_R_coord[1]} radius={4} stroke="red" />
      )}
      {TSP_coord && (
        <Circle x={TSP_coord[0]} y={TSP_coord[1]} radius={4} stroke="red" />
      )}
    </Group>
  );
};
export default ResultDiagram;
