import AppShell from "./app/components/AppShell";
import ThemeProvider from "./app/Contexts/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
