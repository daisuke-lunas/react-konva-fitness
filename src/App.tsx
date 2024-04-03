import { Box, Container, Grid } from "@mui/material";
import "./App.css";
import { indigo } from "@mui/material/colors";
import ResultRow from "./components/resultRow";
import bodyImgWoman from "./assets/人体図女性.png";
import { Circle, Layer, Stage } from "react-konva";
import BackgroundHex from "./components/backGroundHex";

const WIDTH = 840;
const IMG_HEIGHT = 300;

const stageHeight = IMG_HEIGHT + 8;
const stageWidth = WIDTH - 46;
const centerX = stageWidth / 2;
const centerY = stageHeight / 2;

function App() {
  const stageTop =
    parseFloat(getComputedStyle(document.documentElement).fontSize) * 2 + 68;

  return (
    <Container sx={{ width: WIDTH + "px" }}>
      <Box>
        <Grid
          container
          columnGap={2}
          sx={{ backgroundColor: indigo[100], padding: 2 }}
        >
          <Grid item> 山田花 さん</Grid>
          <Grid item> 性別: 女性</Grid>
          <Grid item sx={{ marginLeft: "auto" }}>
            {new Date().toLocaleDateString(undefined, { dateStyle: "full" })}
          </Grid>
        </Grid>
      </Box>
      <Box my={1}>
        {
          //ここに人体図と六角形
        }
        <Container>
          <img src={bodyImgWoman} height={"300px"}></img>
        </Container>
        <Box
          id="konva-container"
          sx={{
            position: "absolute",
            top: stageTop + "px",
            width: stageWidth + "px",
            height: stageHeight + "px",
            // border: "solid grey 1px",
          }}
        >
          <Stage width={stageWidth} height={stageHeight}>
            <Layer>
              {
                // 描きたい図形は、二等辺三角形を上下に2個、その間に長方形
                // storeから必要な値を取得する
              }
              <Circle x={centerX} y={centerY} radius={10} stroke="red"></Circle>
              <BackgroundHex
                centerPoint={[centerX, centerY]}
                ratio={1}
              ></BackgroundHex>
              <BackgroundHex
                centerPoint={[centerX, centerY]}
                ratio={2}
              ></BackgroundHex>
              <BackgroundHex
                centerPoint={[centerX, centerY]}
                ratio={3}
              ></BackgroundHex>
            </Layer>
          </Stage>
        </Box>
      </Box>
      <Box>
        <Grid
          container
          border={"grey solid 1px"}
          direction={"column"}
          spacing={1}
        >
          <ResultRow name="DP"></ResultRow>
          <ResultRow name="SM" hasBodySide></ResultRow>
          <ResultRow name="IL" hasBodySide></ResultRow>
          <ResultRow name="ASLR" hasBodySide></ResultRow>
          <ResultRow name="RS" hasBodySide></ResultRow>
          <ResultRow name="TSP" noBorder></ResultRow>
        </Grid>
      </Box>
      <Box>
        {
          // ひとこと欄
        }
      </Box>
    </Container>
  );
}

export default App;
