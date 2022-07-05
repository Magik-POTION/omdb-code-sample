import logo from "./logo.svg";
import "./App.css";
import { View } from "react-native";
import { DarkTheme, Provider as PaperProvider } from "react-native-paper";

function App() {
  return (
    <PaperProvider theme={DarkTheme}>
      <View>

      </View>
    </PaperProvider>
  );
}

export default App;
