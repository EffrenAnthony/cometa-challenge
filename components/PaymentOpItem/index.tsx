import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import PaymentCheck from "@components/PaymentCheck";
import { PAYMENT_STATUS } from "enums";

const PaymentOpItem = ({
  paymentOperation,
  status,
}: {
  paymentOperation: PaymentOrderType[];
  status: string;
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Accordion
        sx={{ boxShadow: "0px 0px", pl: "0px" }}
        expanded={expanded}
        onChange={handleChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            minHeight: "0px",
          }}
        >
          <div>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
              }}
            >
              {status === PAYMENT_STATUS.PAID
                ? "Cuotas pagadas"
                : status === PAYMENT_STATUS.DUE
                ? "Cuotas pendientes"
                : "Cuotas futuras"}
            </Typography>
            {!expanded && (
              <Typography
                variant="caption"
                component="div"
                sx={{
                  color: "#a1a1a1",
                }}
              >
                Dale click para expandir
              </Typography>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {paymentOperation.map((operation) => (
            <PaymentCheck
              id={operation.id}
              name={operation.name}
              due={new Date(operation.due)}
              price={operation.price}
              interest={operation.interest}
              payin={operation.payin!}
              key={operation.id}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PaymentOpItem;
