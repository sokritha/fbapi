import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProgressBar } from "@components/commons";
import { RecoilRoot } from "recoil";

const Noop = ({ children }) => <>{children}</>;

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    blue: {
      main: "#1976d2",
    },
    green: {
      main: "#00796b",
    },
  },
});

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Noop;
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <ProgressBar />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
