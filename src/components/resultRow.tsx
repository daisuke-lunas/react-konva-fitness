import { Box, Grid, TextField } from "@mui/material";

import { FMSName } from "../logic/coordinatesLogic";
import { lightGreen } from "@mui/material/colors";

const explanations: { [key: string]: string } = {
  DP: "全身のコントロール、柔軟性を評価しています",
  RS: "動きながら体幹を安定させられる力があるかを評価しています",
  SM: "肩と背骨の柔軟性を評価しています",
  TSP: "瞬間的に体を動かせるか、体幹の基礎的能力を評価しています",
  IL: "左右片側の柔軟性とコントロール能力を評価しています",
  ASLR: "下肢の柔軟性と体感の安定性を評価しています",
};

interface _props {
  name: FMSName;
  hasBodySide?: boolean;
  noBorder?: boolean;
}

const ResultRow = (props: _props) => {
  return (
    <Grid
      item
      sx={{
        borderBottom: props.noBorder ? "" : "solid grey 1px",
        paddingBottom: 1,
        backgroundColor: lightGreen["A100"],
      }}
    >
      <Grid container direction={"row"} alignItems={"center"} gap={1}>
        <Grid item padding={1} width={60}>
          {props.name}
        </Grid>
        <Grid item>
          <Box width={240}>
            {props.hasBodySide ? (
              <Grid container alignItems={"center"} spacing={1}>
                <Grid item width={120}>
                  <TextField size="small" label="Left" />
                  <TextField size="small" label="Right" sx={{ marginTop: 1 }} />
                </Grid>
                <Grid item width={100}>
                  <TextField disabled label="avg." />
                </Grid>
              </Grid>
            ) : (
              <TextField fullWidth size="small" />
            )}
          </Box>
        </Grid>
        <Grid item>{explanations[props.name]}</Grid>
      </Grid>
    </Grid>
  );
};

// storeを作って、そこに値をためる。
// formのonChangeとかfilledとかを拾って、storeに反映させる実装で
export default ResultRow;
