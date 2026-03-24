import AppNavigator from "./app/navigation/AppNavigator";
import ThemeProvider from "./app/Contexts/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
