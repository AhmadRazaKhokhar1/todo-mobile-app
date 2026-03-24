import AboutOverview from "../components/AboutOverview";
import { useTheme } from "../hooks/useTheme";

export default function About() {
  const { palette } = useTheme();
  return <AboutOverview palette={palette} />;
}
