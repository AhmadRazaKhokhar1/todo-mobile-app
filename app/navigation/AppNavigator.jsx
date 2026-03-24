import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppShell from "../components/AppShell";
import { ThemeContext } from "../Contexts/ThemeContext";
import RootNavigator from "./RootNavigator";

export default function AppNavigator() {
  const { palette } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={palette.navTheme}>
      <AppShell>
        <RootNavigator />
      </AppShell>
    </NavigationContainer>
  );
}
