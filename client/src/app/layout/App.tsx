import { Box, Container, CssBaseline } from "@mui/material";

import NavBar from "./NavBar";

import CommonToastContainer from "../shared/components/common/Toast";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/Home/HomePage";
import { useEffect } from "react";
import { LoaderProvider, useLoader } from "../shared/components/Loader";
//import { setLoaderSetter } from "../../lib/api/agent";
import GlobalLoader from "../shared/components/common/GlobalLoader";


function App() {
  const location = useLocation();

  const LoaderBridge: React.FC = () => {
    const { setLoading } = useLoader();

    useEffect(() => {
     // setLoaderSetter(setLoading);
    }, [setLoading]);

    return null;
  };
  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <LoaderProvider>
            <LoaderBridge />
            <GlobalLoader />
            <NavBar />
            <Container maxWidth="xl" sx={{ mt: 3 }}>
              <Outlet />
            </Container>
          </LoaderProvider>

        </>
      )}


      {/* Add your toast container here */}
      <CommonToastContainer />
    </Box>
  );
}

export default App;