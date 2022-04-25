import React, { useEffect, useState } from "react";
import PaymentOpItem from "@components/PaymentOpItem";
import fetch from "isomorphic-unfetch";
import { Paper } from "@mui/material";
import { groupBy } from "utils/groupBy";
import { usePaymentStore } from "@stores/PaymentStore";
import { getPaymentOps } from "services/getPaymentOps";

const PaymentOpsList = () => {
  const { setPaymentList } = usePaymentStore();
  const [paymentOperations, setPaymentOperations] = useState<
    PaymentOperations
  >({});
  useEffect(() => {
    const getPayments = async () => {
      const res = await getPaymentOps()
      setPaymentList(res)
      const groupedByStatus: PaymentOperations = groupBy(res, "status");
      setPaymentOperations(groupedByStatus);
    };
    getPayments();
  }, [setPaymentList])

  return (
    <div>
      {Object.entries(paymentOperations as PaymentOperations).map((entry:[string, unknown], key) => (
        <Paper elevation={0} sx={{ pt: 1, pb: 1, mt: 1 }} key={key}>
          <PaymentOpItem paymentOperation={entry[1] as PaymentOrderType[]} status={entry[0]}/>
        </Paper>
      ))}
    </div>
  );
};

export default PaymentOpsList;
