import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      {/* Placeholder for our page */}
      <Component {...pageProps} />
    </>
  );
}
