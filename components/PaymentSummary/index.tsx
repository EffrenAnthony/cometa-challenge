import { Grid, Paper, Typography } from "@mui/material";
import { usePaymentStore } from "@stores/PaymentStore";
import React from "react";

const PaymentSummary = () => {
  const { totalAmount, studentInfo } = usePaymentStore()
  return (
    <div>
      <Paper elevation={0} sx={{ py: 1, px: 2, mt: 10 }}>
        <Grid container spacing={1}>
          <Grid item xl={12} container spacing={1} justifyContent="space-between">
            <Grid item xl={6}>
              <Typography gutterBottom variant="caption" component="div">
                {studentInfo?.first_name + " " + studentInfo?.last_name}
              </Typography>
            </Grid>
            <Grid item xl={6}>
              <Typography variant="caption" component="div">
                {studentInfo?.cohort}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xl={12} container spacing={1} justifyContent="space-between">
            <Grid item xl={6}>
              <Typography gutterBottom variant="h6" component="div">
                Total a Pagar
              </Typography>
            </Grid>
            <Grid item xl={6}>
              <Typography variant="h6" component="div">
                $ {totalAmount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PaymentSummary;
