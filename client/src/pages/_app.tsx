import "@/styles/globals.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { HOC, Header, Querier, Footer } from "@/components";
import { Toaster } from "sonner";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apollo-client";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster
              position="bottom-left"
              toastOptions={{
                className: "max-w-[85vw] xs:max-w-none ",
              }}
            />
            <HOC>
              <Querier>
                <Header />
                <Component {...pageProps} />
                <Footer />
              </Querier>
            </HOC>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </>
  );
};

export default App;
