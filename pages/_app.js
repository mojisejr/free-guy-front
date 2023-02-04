import "../styles/globals.css";
import { AppProvider } from "../contexts";
import { MeshProvider } from "@meshsdk/react";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <MeshProvider>
        <Component {...pageProps} />
      </MeshProvider>
    </AppProvider>
  );
}

export default MyApp;
