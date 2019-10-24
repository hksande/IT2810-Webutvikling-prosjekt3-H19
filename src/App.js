import React from "react";
import Container from "./components/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );
}

export default App;
