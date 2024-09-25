import "./App.css";
import { ThemeProvider } from "styled-components";
import { vexpensesTheme } from "./styles/theme/theme";
import { Button } from "@/components/ui";

function App() {
  return (
    <ThemeProvider theme={vexpensesTheme}>
      <Button
        onClick={() => {
          console.log("clicked");
        }}
      >
        I am a button
      </Button>
    </ThemeProvider>
  );
}

export default App;
