import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import About from "../screens/About";
import { appRoutes, initialRouteName } from "./routes";

const Stack = createStackNavigator();
const routeComponents = {
  Home,
  About,
};

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      {appRoutes.map((route) => {
        const ScreenComponent = routeComponents[route.name];
        return <Stack.Screen key={route.name} name={route.name} component={ScreenComponent} />;
      })}
    </Stack.Navigator>
  );
}
