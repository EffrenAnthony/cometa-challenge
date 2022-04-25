import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { PaymentProvider } from "stores/PaymentStore";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PaymentProvider>
      <Component {...pageProps} />
    </PaymentProvider>
  );
}

export default MyApp;
