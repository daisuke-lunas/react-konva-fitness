import { grey } from "@mui/material/colors";
import { Line } from "react-konva";
import { CenterPoint, calcCoordinates } from "../logic/coordinatesLogic";

interface _props {
  centerPoint: CenterPoint;
  ratio: 0 | 1 | 2 | 3;
}

function calcPoints(centerPoint: CenterPoint, ratio: 0 | 1 | 2 | 3) {
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

const BackgroundHex = (props: _props) => {
  return (
    <>
      <Line
        stroke={grey[400]}
        strokeWidth={2}
        points={calcPoints(props.centerPoint, props.ratio)}
        dash={[5, 5]}
      ></Line>
    </>
  );
};

export default BackgroundHex;
