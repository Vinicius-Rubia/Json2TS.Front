import { ThemeProvider } from "./components/theme-provider";
import { Json2TSConvert } from "./pages/json2ts-convert";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="json2ts-theme">
      <Json2TSConvert />
    </ThemeProvider>
  );
}

export default App;
