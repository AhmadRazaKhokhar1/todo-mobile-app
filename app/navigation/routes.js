import Home from "../screens/Home";
import About from "../screens/About";

export const routeNames = {
  home: "Home",
  about: "About",
};

export const appRoutes = [
  { name: routeNames.home, label: "Home", component: Home, showInNav: true },
  { name: routeNames.about, label: "About", component: About, showInNav: true },
];

export const navRoutes = appRoutes
  .filter((route) => route.showInNav)
  .map(({ name, label }) => ({ name, label }));

export const initialRouteName = routeNames.home;
