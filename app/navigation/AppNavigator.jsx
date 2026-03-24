import { useCallback, useContext, useState } from "react";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import AppShell from "../components/AppShell";
import { ThemeContext } from "../Contexts/ThemeContext";
import RootNavigator from "./RootNavigator";
import { appRoutes } from "./routes";

const navigationRef = createNavigationContainerRef();

export default function AppNavigator() {
  const { palette, isDarkMode, themeHandler } = useContext(ThemeContext);
  const [currentRouteName, setCurrentRouteName] = useState("Home");

  const syncCurrentRoute = useCallback(() => {
    const nextRouteName = navigationRef.getCurrentRoute()?.name;

    if (nextRouteName) {
      setCurrentRouteName(nextRouteName);
    }
  }, []);

  const handleNavigate = useCallback(
    (routeName) => {
      if (routeName === currentRouteName || !navigationRef.isReady()) {
        return;
      }

      navigationRef.navigate(routeName);
    },
    [currentRouteName]
  );

  return (
    <NavigationContainer ref={navigationRef} theme={palette.navTheme} onReady={syncCurrentRoute} onStateChange={syncCurrentRoute}>
      <AppShell
        palette={palette}
        isDarkMode={isDarkMode}
        navItems={appRoutes.map((route) => route.name)}
        currentRouteName={currentRouteName}
        onNavigate={handleNavigate}
        onToggleTheme={themeHandler}
      >
        <RootNavigator />
      </AppShell>
    </NavigationContainer>
  );
}
