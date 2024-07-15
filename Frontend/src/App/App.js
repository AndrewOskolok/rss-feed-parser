import * as React from "react";
import Box from "@mui/material/Box";
import Header from "../Components/Header/Header";
import Post from "../Components/Post/Post";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Post />
    </Box>
  );
}

export default App;
