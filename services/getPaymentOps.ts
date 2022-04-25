import fetch from "isomorphic-unfetch";

const myHeaders = new Headers();
myHeaders.append("hash", "OcJn4jYChW");

const requestOptions: any = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};


export const getPaymentOps = async () => {
  const response = await fetch(
    "http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/orders/",
    requestOptions
  );
  const res: PaymentOrders = await response.json();
  return res
};