import "../styles/index.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import React from "react";
import ReactDOM from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { config, network } from "./../config";

const { chains, provider } = configureChains(
  [network.chain],
  [alchemyProvider({ alchemyId: process.env.REACT_PUBLIC_ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: config.appName,
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const client = new ApolloClient({
  link: new HttpLink({ uri: network.graphUrl }),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false);
  // const [dark, setDark] = useState(localStorage.getItem("theme") === "night");

  useEffect(() => {
    // localStorage.setItem("theme", dark ? "night" : "cmyk");
  }, [dark]);

  return (
    <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div className="font-workSans min-h-screen bg-base-200 flex flex-col" data-theme={dark ? "night" : "cmyk"}>
            <Header theme={dark} setTheme={setDark} />
            <Component {...pageProps} />
            <Footer />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
