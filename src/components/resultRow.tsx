import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";

import { FMSName, FMSValue, Side } from "../logic/coordinatesLogic";
import { lightGreen } from "@mui/material/colors";
import { ResultStore } from "../stores/resultStore";
import React, { useEffect, useState } from "react";

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
  fixed: boolean;
}

const ResultRow = (props: _props) => {
  const resultStore = ResultStore.useContainer();
  const [avg, setAvg] = useState<number>(0);

  useEffect(() => {
    if (props.hasBodySide) {
      const lVal = resultStore.value(props.name, "L");
      const rVal = resultStore.value(props.name, "R");
      if (lVal !== undefined && rVal !== undefined) {
        setAvg((lVal + rVal) / 2);
      }
    }
  }, [props.hasBodySide, props.name, resultStore]);

  const onChange = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    lr: Side
  ) => {
    const val = FMSValue(Number(evt.target.value));
    resultStore.setValue(props.name, lr, val);
  };

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
                <Grid item width={props.fixed ? 120 : 80}>
                  {!props.fixed && (
                    <>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        label="Left"
                        onChange={(evt) => onChange(evt, "L")}
                        defaultValue={0}
                      >
                        <MenuItem value={0}> </MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </TextField>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        label="Right"
                        sx={{ marginTop: 1 }}
                        onChange={(evt) => onChange(evt, "R")}
                        defaultValue={0}
                      >
                        <MenuItem value={0}> </MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </TextField>
                    </>
                  )}
                  {props.fixed && (
                    <>
                      <Typography variant="body1">
                        Left:{"  "}
                        {resultStore.value(props.name, "L")}
                      </Typography>
                      <Typography variant="body1">
                        Right: {resultStore.value(props.name, "R")}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item width={100}>
                  <Typography variant="body1">avg.: {avg}</Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                {!props.fixed && (
                  <TextField
                    select
                    type={"number"}
                    fullWidth
                    size="small"
                    onChange={(evt) => onChange(evt, null)}
                    defaultValue={0}
                  >
                    <MenuItem value={0}></MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </TextField>
                )}
                {props.fixed && (
                  <Typography variant="body1">
                    {resultStore.value(props.name, null)}
                  </Typography>
                )}
              </>
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
