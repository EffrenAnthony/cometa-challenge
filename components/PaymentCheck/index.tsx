import { Checkbox, Grid, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PAYMENT_STATUS } from "enums";
import { usePaymentStore } from "@stores/PaymentStore";

const PaymentCheck = ({
  name,
  due,
  price,
  interest,
  payin,
  status,
  id,
}: PaymentCheck) => {
  const { markUnmarkPayment, paymentsList, setTotalAmount, totalAmount } =
    usePaymentStore();
  const [checked, setChecked] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<string | null>();

  const handleChecked = () => {
    const indexItem = paymentsList.indexOf(
      paymentsList.filter((item) => item.id === id)[0]
    );
    if (paymentsList[indexItem + 1]?.checkedForPay) {
      setOpenSnack(
        "Desmarca la opcion de pago siguiente si deseas desmarcar esta"
      );
    } else {
      setChecked(!checked);
      markUnmarkPayment(id);
      if (!checked) {
        if (interest) {
          console.log(totalAmount + Number(interest) + Number(price));
          setTotalAmount(totalAmount + Number(interest) + Number(price));
        } else {
          setTotalAmount(totalAmount + Number(price));
        }
      } else {
        if (interest) {
          setTotalAmount(totalAmount - Number(interest) - Number(price));
        } else {
          setTotalAmount(totalAmount - Number(price));
        }
      }
    }
  };

  const validatePreviousChecked = () => {
    const pastItems = paymentsList.filter(
      (item) => new Date(item.due) < new Date(due)
    );
    if (pastItems.length > 0) {
      const indexItem = paymentsList.indexOf(
        paymentsList.filter((item) => item.id === id)[0]
      );
      if (paymentsList[indexItem - 1]?.checkedForPay) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack ? true : false}
        onClose={() => setOpenSnack(null)}
        message={openSnack}
      />
      <Grid container spacing={1}>
        <Grid item xs={10} container justifyContent="space-between">
          <Grid
            item
            xl={12}
            container
            spacing={0}
            justifyContent="space-between"
            sx={{
              padding: "0px",
            }}
          >
            <Grid item xl={6}>
              <Typography gutterBottom variant="subtitle2" component="div">
                {name}
              </Typography>
            </Grid>
            <Grid item xl={6}>
              <Typography variant="subtitle1" component="div">
                $ {price}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xl={12}
            container
            spacing={0}
            justifyContent="space-between"
            sx={{
              padding: "0px",
            }}
          >
            <Grid item xl={6}>
              <Typography gutterBottom variant="caption" component="div">
                {status === PAYMENT_STATUS.PAID
                  ? "Pagado"
                  : status === PAYMENT_STATUS.DUE
                  ? "Vencido"
                  : "Vence"}{" "}
                el {moment(due).format("MMM Do YY")}
              </Typography>
            </Grid>
            {interest && (
              <Grid item xl={6}>
                <Typography variant="caption" component="div">
                  Interes: $ {interest}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid container item xs={2} direction="row" justifyContent="flex-end">
          {payin ? (
            <Typography variant="h6" component="div">
              <ChevronRightIcon />
            </Typography>
          ) : (
            <>
              <Typography
                variant="h6"
                component="div"
                onClick={() => {
                  if (validatePreviousChecked()) {
                    setOpenSnack(
                      "No puedes pagar una cuota sin pagar la anterior"
                    );
                  }
                }}
              >
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  checked={checked}
                  onChange={handleChecked}
                  disabled={validatePreviousChecked()}
                />
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentCheck;
