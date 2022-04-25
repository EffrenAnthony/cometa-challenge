import Navbar from "@components/Navbar";
import { Box, Container, Fab } from "@mui/material";
import { usePaymentStore } from "@stores/PaymentStore";
import React from "react";
import styles from "./styles.module.scss";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { totalAmount } = usePaymentStore();
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">{children}</Container>
      {totalAmount > 0 && (
        <div className={styles.floating}>
          <Container maxWidth="sm">
            <Fab
              variant="extended"
              color="primary"
              aria-label="add"
              sx={{ width: "100%" }}
            >
              IR A PAGAR
            </Fab>
          
          </Container>
        </div>
      )}
      <Box sx={{ height: '200px'}}></Box>
    </>
  );
};

export default Layout;
