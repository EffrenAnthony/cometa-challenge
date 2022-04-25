import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@components/Layout";
import { Box, Fab } from "@mui/material";
import PaymentSummary from "@components/PaymentSummary";
import PaymentOpsList from "@components/PaymentOpsList";
import { useEffect } from "react";
import { getStudentInfo } from "services/getStudentInfo";
import { usePaymentStore } from "@stores/PaymentStore";
const Home: NextPage = () => {
  const { setStudentInfo } = usePaymentStore()
  useEffect(()=> {
    const getStudent = async () => {
      const res = await getStudentInfo()
      setStudentInfo(res)      
    } 
    getStudent()
  },[setStudentInfo])
  return (
    <div>
      <Head>
        <title>Cometa | React Frontend challenge</title>
        <meta name="description" content="Cometa React Frontend Challenge" />
      </Head>
      <Layout>
        <Box sx={{ marginTop: "56px" }}>
          <PaymentSummary />
          <PaymentOpsList />
        </Box>
      </Layout>
    </div>
  );
};

export default Home;
