import { Box, Container, CssBaseline } from "@mui/material";

import NavBar from "./NavBar";

import CommonToastContainer from "../shared/components/common/Toast";
import { Outlet } from "react-router";


function App() {
  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Outlet />
      </Container>

      {/* Add your toast container here */}
      <CommonToastContainer />
    </Box>
  );
}

export default App;