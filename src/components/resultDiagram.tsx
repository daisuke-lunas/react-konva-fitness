import { Circle, Group, Line } from "react-konva";
import { Result, ResultStore } from "../stores/resultStore";
import { useEffect, useRef, useState } from "react";
import {
  CenterPoint,
  Coordinates,
  calcCoordinates,
} from "../logic/coordinatesLogic";
import { lightBlue } from "@mui/material/colors";
import Konva from "konva";

interface _clProps {
  centerPoint: CenterPoint;
  coord?: Coordinates;
  next?: Coordinates;
  fixed: boolean;
}

const _circleAndLine = (props: _clProps) => {
  const lineLef = useRef<Konva.Line>(null);

  useEffect(() => {
    if (
      props.fixed &&
      lineLef &&
      lineLef.current &&
      props.coord &&
      props.next
    ) {
      lineLef.current.to({
        points: [props.coord[0], props.coord[1], props.next[0], props.next[1]],
        duration: 0.3,
      });
    }
  }, [props.fixed, props.coord, props.next]);

  return (
    <>
      {props.coord && props.fixed && (
        <Circle
          x={props.coord[0]}
          y={props.coord[1]}
          radius={4}
          stroke={lightBlue[700]}
        />
      )}
      {props.coord && props.next && (
        <Line
          ref={lineLef}
          stroke={lightBlue[300]}
          strokeWidth={2}
          points={[
            props.centerPoint[0],
            props.centerPoint[1],
            props.centerPoint[0],
            props.centerPoint[1],
          ]}
        />
      )}
    </>
  );
};

interface _props {
  centerPoint: CenterPoint;
  fixed: boolean;
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
      <_circleAndLine {...props} coord={DP_coord} next={SM_R_coord} />
      <_circleAndLine
        {...props}
        coord={SM_R_coord}
        next={IL_R_coord}
        fixed={props.fixed}
      />
      <_circleAndLine
        {...props}
        coord={IL_R_coord}
        next={ASLR_R_coord}
        fixed={props.fixed}
      />
      <_circleAndLine
        {...props}
        coord={ASLR_R_coord}
        next={RS_R_coord}
        fixed={props.fixed}
      />
      <_circleAndLine
        {...props}
        coord={RS_R_coord}
        next={TSP_coord}
        fixed={props.fixed}
      />
      <_circleAndLine
        {...props}
        coord={TSP_coord}
        next={RS_L_coord}
        fixed={props.fixed}
      />
      <_circleAndLine
        {...props}
        coord={RS_L_coord}
        next={ASLR_L_coord}
        fixed={props.fixed}
      />
      <_circleAndLine
        {...props}
        coord={ASLR_L_coord}
        next={IL_L_coord}
        fixed={props.fixed}
      />
      <_circleAndLine
        {...props}
        coord={IL_L_coord}
        next={SM_L_coord}
        fixed={props.fixed}
      />
      <_circleAndLine
        {...props}
        coord={SM_L_coord}
        next={DP_coord}
        fixed={props.fixed}
      />
    </Group>
  );
};
export default ResultDiagram;
