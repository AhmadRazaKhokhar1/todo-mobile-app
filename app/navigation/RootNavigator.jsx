import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import About from "../screens/About";
import { appRoutes, initialRouteName, routeNames } from "./routes";

const Stack = createStackNavigator();
const routeComponents = {
  [routeNames.home]: Home,
  [routeNames.about]: About,
};

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      {appRoutes.map((route) => {
        const routeComponent = routeComponents[route.name];

        if (!routeComponent) {
          return null;
        }

        return <Stack.Screen key={route.name} name={route.name} component={routeComponent} />;
      })}
    </Stack.Navigator>
  );
}
