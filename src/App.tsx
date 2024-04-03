import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import "./App.css";
import { indigo } from "@mui/material/colors";
import ResultRow from "./components/resultRow";
import bodyImgWoman from "./assets/人体図女性.png";
import bodyImgMan from "./assets/人体図男性.png";
import { Layer, Stage } from "react-konva";
import BackgroundHex from "./components/backGroundHex";
import { ResultStore } from "./stores/resultStore";
import ResultDiagram from "./components/resultDiagram";
import { useState } from "react";

const WIDTH = 840;
const IMG_HEIGHT = 300;

const stageHeight = IMG_HEIGHT + 36;
const stageWidth = WIDTH - 46;
const centerX = stageWidth / 2;
const centerY = stageHeight / 2;

const _app = () => {
  const [fixed, setFixed] = useState<boolean>(false);
  const [personName, setPersonName] = useState<string>("名無し");
  const [sex, setSex] = useState<string>("");

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
          <Grid item>
            {fixed && <> {personName}</>}
            {!fixed && (
              <TextField
                size="small"
                label={"お名前"}
                onChange={(evt) => setPersonName(evt.target.value)}
              />
            )}
            さん
          </Grid>
          <Grid item>
            {fixed && sex && <> 性別: {sex}</>}
            {!fixed && (
              <TextField
                size="small"
                select
                label={"性別"}
                onChange={(evt) => setSex(evt.target.value)}
                sx={{ width: 100 }}
              >
                <MenuItem value={"女性"}>女性</MenuItem>
                <MenuItem value={"男性"}>男性</MenuItem>
                <MenuItem value={""}>（入力しない）</MenuItem>
              </TextField>
            )}
          </Grid>
          <Grid item sx={{ display: fixed ? "none" : undefined }}>
            <Button
              onClick={() => {
                if (confirm("入力値を確定します。よろしいですか？")) {
                  setFixed(true);
                }
              }}
            >
              確定する
            </Button>
          </Grid>
          <Grid item sx={{ marginLeft: "auto" }}>
            {new Date().toLocaleDateString(undefined, { dateStyle: "full" })}
          </Grid>
        </Grid>
      </Box>
      <Box my={2}>
        <Container>
          <img
            src={sex === "男性" ? bodyImgMan : bodyImgWoman}
            height={"300px"}
          ></img>
        </Container>
        <Box
          id="konva-container"
          sx={{
            position: "absolute",
            top: stageTop + "px",
            width: stageWidth + "px",
            height: stageHeight + "px",
            ml: -1 + "px",
            // border: "solid grey 1px",
          }}
        >
          <Stage width={stageWidth} height={stageHeight}>
            <Layer>
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
                withName
              ></BackgroundHex>
              <ResultDiagram centerPoint={[centerX, centerY]} />
            </Layer>
          </Stage>
        </Box>
      </Box>
      <Box sx={{ mt: 4, ml: 1 }}>
        <Grid
          container
          border={"grey solid 1px"}
          direction={"column"}
          spacing={1}
        >
          <ResultRow name="DP" fixed={fixed}></ResultRow>
          <ResultRow name="SM" hasBodySide fixed={fixed}></ResultRow>
          <ResultRow name="IL" hasBodySide fixed={fixed}></ResultRow>
          <ResultRow name="ASLR" hasBodySide fixed={fixed}></ResultRow>
          <ResultRow name="RS" hasBodySide fixed={fixed}></ResultRow>
          <ResultRow name="TSP" noBorder fixed={fixed}></ResultRow>
        </Grid>
      </Box>
      <Box mt={2}>
        <TextField multiline fullWidth label="施術者からメッセージ" rows={3} />
      </Box>
    </Container>
  );
};

const App = () => {
  return (
    <ResultStore.Provider>
      <_app />
    </ResultStore.Provider>
  );
};

export default App;
