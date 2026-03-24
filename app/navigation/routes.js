import Home from "../screens/Home";
import About from "../screens/About";

export const appRoutes = [
  { name: "Home", label: "Home", component: Home },
  { name: "About", label: "About", component: About },
];

export const initialRouteName = appRoutes[0]?.name ?? "";
