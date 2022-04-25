import { Grid, Paper, Skeleton, Typography } from "@mui/material";
import { usePaymentStore } from "@stores/PaymentStore";
import React from "react";

const PaymentSummary = () => {
  const { totalAmount, studentInfo } = usePaymentStore()
  return (
    <div>
      <Paper elevation={0} sx={{ py: 1, px: 2, mt: 10 }}>
        <Grid container spacing={1}>
          <Grid item xl={12} container spacing={1} justifyContent="space-between">
            <Grid item >
              <Typography gutterBottom variant="caption" component="div">
                {studentInfo ? `${studentInfo?.first_name} ${studentInfo?.last_name}` : <Skeleton variant="text"  width={100}/>}
              </Typography>
            </Grid>
            <Grid item >
              <Typography variant="caption" component="div">
                {studentInfo ? `${studentInfo?.cohort}` : <Skeleton variant="text"  width={100}/>}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xl={12} container spacing={1} justifyContent="space-between">
            <Grid item >
              <Typography gutterBottom variant="h6" component="div">
                {studentInfo ? 'Total a Pagar' : <Skeleton variant="text"  width={100}/>}
              </Typography>
            </Grid>
            <Grid item >
              <Typography variant="h6" component="div">
                {studentInfo ? `$ ${totalAmount}`: <Skeleton variant="text"  width={100}/>}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PaymentSummary;
