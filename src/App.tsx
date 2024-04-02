import { Box, Container, Grid } from "@mui/material";
import "./App.css";
import { indigo } from "@mui/material/colors";
import ResultRow from "./components/resultRow";
import bodyImgWoman from "./assets/人体図女性.png";

function App() {
  return (
    <Container>
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
      <Box>
        {
          //ここに人体図と六角形
        }
        <img src={bodyImgWoman} height={"300px"}></img>
      </Box>
      <Box>
        {
          // ここに数値入力欄＆概説
        }
        <Grid
          container
          border={"black solid 1px"}
          direction={"column"}
          gap={1}
          sx={{ padding: 1 }}
        >
          <ResultRow></ResultRow>
          <ResultRow hasBodySide></ResultRow>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
