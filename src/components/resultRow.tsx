import { Box, Grid, TextField } from "@mui/material";

import { FMSName } from "../logic/coordinatesLogic";

interface _props {
  name: FMSName;
  hasBodySide?: boolean;
}

const ResultRow = (props: _props) => {
  return (
    <Grid item>
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
        <Grid item>説明文</Grid>
      </Grid>
    </Grid>
  );
};

// storeを作って、そこに値をためる。
// formのonChangeとかfilledとかを拾って、storeに反映させる実装で
export default ResultRow;
