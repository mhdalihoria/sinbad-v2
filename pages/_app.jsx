import { useState, useEffect } from "react"; // Import useState and useEffect
import { Fragment } from "react";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { appWithTranslation } from "next-i18next";
import RTL from "components/RTL";
import MuiTheme from "theme/MuiTheme";
import OpenGraphTags from "utils/OpenGraphTags";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import SnackbarProvider from "components/SnackbarProvider";
import nextI18NextConfig from "../next-i18next.config";
import "nprogress/nprogress.css";
import "simplebar/dist/simplebar.min.css";
import "../src/__server__";
import MainHeader from "../src/pages-sections/header/MainHeader";
import CustomFooter from "../src/pages-sections/footer/CustomFooter";
import Overlay from "../src/components/overlay/Overlay";
import PageLoader from "../src/components/loader-spinner/PageLoader";
import MainLayout from "../src/components/layouts/MainLayout";
//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({
  showSpinner: false,
});

const App = ({ Component, pageProps }) => {
  const AnyComponent = Component;
  const getLayout = AnyComponent.getLayout ?? ((page) => page);

  const [stylesReady, setStylesReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStylesReady(true);
    }, 2500); // 2.5 seconds
  }, []);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Sinbad V2. An Ecommerce website that provides good with the highest of quality, in the cheapest of prices."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <OpenGraphTags />
        <title>SinBad v2</title>
      </Head>

      <SettingsProvider>
        <AppProvider>
          <MuiTheme>
            <SnackbarProvider>
              <RTL>
                <PageLoader />
                {/* {stylesReady && <MainHeader />}
                {stylesReady && getLayout(<AnyComponent {...pageProps} />)}
                {stylesReady && <CustomFooter />} */}
                {stylesReady && (
                  <MainLayout>
                    <AnyComponent {...pageProps} />
                  </MainLayout>
                )}
              </RTL>
            </SnackbarProvider>
          </MuiTheme>
        </AppProvider>
      </SettingsProvider>
    </Fragment>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
