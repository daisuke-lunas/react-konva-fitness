import { grey } from "@mui/material/colors";
import { Group, Line, Text } from "react-konva";
import {
  CenterPoint,
  FMSValue,
  calcCoordinates,
} from "../logic/coordinatesLogic";

function calcPoints(centerPoint: CenterPoint, ratio: FMSValue) {
  const rslt: number[] = [];
  return rslt.concat(
    calcCoordinates("DP", null, centerPoint, ratio),
    calcCoordinates("SM", "R", centerPoint, ratio),
    calcCoordinates("IL", "R", centerPoint, ratio),
    calcCoordinates("ASLR", "R", centerPoint, ratio),
    calcCoordinates("RS", "R", centerPoint, ratio),
    calcCoordinates("TSP", null, centerPoint, ratio),
    calcCoordinates("RS", "L", centerPoint, ratio),
    calcCoordinates("ASLR", "L", centerPoint, ratio),
    calcCoordinates("IL", "L", centerPoint, ratio),
    calcCoordinates("SM", "L", centerPoint, ratio),
    calcCoordinates("DP", null, centerPoint, ratio)
  );
}

interface _props {
  centerPoint: CenterPoint;
  ratio: FMSValue;
  withName?: boolean;
}

const BackgroundHex = (props: _props) => {
  const points = calcPoints(props.centerPoint, props.ratio);
  return (
    <>
      <Line
        stroke={grey[400]}
        strokeWidth={2}
        points={points}
        dash={[5, 5]}
      ></Line>
      {props.withName && (
        <Group>
          <Text
            x={points[0] - 12}
            y={points[1] - 16}
            text={"DP"}
            fontSize={16}
            fill={grey[400]}
          />
          <Text
            x={points[2] + 6}
            y={points[3]}
            text={"SM-R"}
            fontSize={16}
            fill={grey[400]}
          />
          <Text
            x={points[4] + 8}
            y={points[5]}
            text={"IL-R"}
            fontSize={16}
            fill={grey[400]}
          />
          <Text
            x={points[6] + 8}
            y={points[7]}
            text={"ASLR-R"}
            fontSize={16}
            fill={grey[400]}
          />
          <Text
            x={points[8] + 4}
            y={points[9]}
            text={"RS-R"}
            fontSize={16}
            fill={grey[400]}
          />
          <Text
            x={points[10] - 16}
            y={points[11]}
            text={"TSP"}
            fontSize={16}
            fill={grey[400]}
          />
          <Text
            x={points[12] - 40}
            y={points[13]}
            text={"RS-L"}
            fontSize={16}
            fill={grey[400]}
          />
          <Text
            x={points[14] - 64}
            y={points[15]}
            text={"ASLR-L"}
            fontSize={16}
            fill={grey[400]}
          />
          <Text
            x={points[16] - 36}
            y={points[17]}
            text={"IL-L"}
            fontSize={16}
            fill={grey[400]}
          />
          <Text
            x={points[18] - 44}
            y={points[19]}
            text={"SM-L"}
            fontSize={16}
            fill={grey[400]}
          />
        </Group>
      )}
    </>
  );
};

export default BackgroundHex;
