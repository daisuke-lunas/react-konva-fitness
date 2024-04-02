import { Box, Grid, TextField } from "@mui/material";

interface _props {
  hasBodySide?: boolean;
}

const ResultRow = (props: _props) => {
  return (
    <Grid item>
      <Grid container direction={"row"} gap={1} alignItems={"center"}>
        <Grid item padding={1}>
          paramName
        </Grid>
        <Grid item>
          <Box width={100}>
            {props.hasBodySide ? (
              <>
                <TextField fullWidth size="small"></TextField>
                <TextField fullWidth size="small"></TextField>
              </>
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
