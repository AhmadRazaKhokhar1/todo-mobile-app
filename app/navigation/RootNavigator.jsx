import { createStackNavigator } from "@react-navigation/stack";
import { appRoutes } from "./routes";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      {appRoutes.map((route) => (
        <Stack.Screen key={route.name} name={route.name} component={route.component} />
      ))}
    </Stack.Navigator>
  );
}
