import { createStackNavigator } from "@react-navigation/stack";
import { appRoutes, initialRouteName } from "./routes";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      {appRoutes.map((route) => {
        return <Stack.Screen key={route.name} name={route.name} component={route.component} />;
      })}
    </Stack.Navigator>
  );
}
