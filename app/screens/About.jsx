import { useContext } from "react";
import AboutOverview from "../components/AboutOverview";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function About() {
  const { palette } = useContext(ThemeContext);
  return <AboutOverview palette={palette} />;
}
