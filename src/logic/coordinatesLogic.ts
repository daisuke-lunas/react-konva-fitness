export type FMSName = "DP" | "SM" | "IL" | "ASLR" | "RS" | "TSP";
type X = number;
type Y = number;
export type CenterPoint = [X, Y];
export type Coordinates = [X, Y];

const vert_basic_width = 25;

const SM_R_X_base = 50;
const SM_R_Y = -75;
const SM_L_X_base = SM_R_X_base * -1;
const SM_L_Y = SM_R_Y;

const IL_R_X_base = 50;
const IL_R_Y = -25;
const IL_L_X_base = IL_R_X_base * -1;
const IL_L_Y = IL_R_Y;

const ASLR_R_X_base = 50;
const ASLR_R_Y = 25;
const ASLR_L_X_base = ASLR_R_X_base * -1;
const ASLR_L_Y = ASLR_R_Y;

const RS_R_X_base = 50;
const RS_R_Y = 75;
const RS_L_X_base = RS_R_X_base * -1;
const RS_L_Y = RS_R_Y;

export function calcCoordinates(
  name: FMSName,
  side: "R" | "L" | null,
  centerPoint: CenterPoint,
  ratio: 0 | 1 | 2 | 3
): Coordinates {
  switch (name) {
    case "DP":
      return [
        centerPoint[0],
        centerPoint[1] + SM_R_Y + vert_basic_width * ratio * -1,
      ];

    case "SM":
      switch (side) {
        case "R":
          return [
            centerPoint[0] + SM_R_X_base * ratio,
            centerPoint[1] + SM_R_Y,
          ];
        case "L":
          return [
            centerPoint[0] + SM_L_X_base * ratio,
            centerPoint[1] + SM_L_Y,
          ];
        case null:
          return [0, 0];
      }
      break;
    case "IL":
      switch (side) {
        case "R":
          return [
            centerPoint[0] + IL_R_X_base * ratio,
            centerPoint[1] + IL_R_Y,
          ];
        case "L":
          return [
            centerPoint[0] + IL_L_X_base * ratio,
            centerPoint[1] + IL_L_Y,
          ];
        case null:
          return [0, 0];
      }
      break;
    case "ASLR":
      switch (side) {
        case "R":
          return [
            centerPoint[0] + ASLR_R_X_base * ratio,
            centerPoint[1] + ASLR_R_Y,
          ];
        case "L":
          return [
            centerPoint[0] + ASLR_L_X_base * ratio,
            centerPoint[1] + ASLR_L_Y,
          ];
        case null:
          return [0, 0];
      }
      break;
    case "RS":
      switch (side) {
        case "R":
          return [
            centerPoint[0] + RS_R_X_base * ratio,
            centerPoint[1] + RS_R_Y,
          ];
        case "L":
          return [
            centerPoint[0] + RS_L_X_base * ratio,
            centerPoint[1] + RS_L_Y,
          ];
        case null:
          return [0, 0];
      }
      break;
    case "TSP":
      return [
        centerPoint[0],
        centerPoint[1] + RS_R_Y + vert_basic_width * ratio,
      ];
      break;
  }
}
