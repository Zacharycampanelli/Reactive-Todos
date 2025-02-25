import { FC } from "react";
import { useMediaQuery } from "usehooks-ts";

import {
  desktopDark,
  desktopLight,
  mobileDark,
  mobileLight,
} from "../assets/images/backgrounds";
import { useTheme } from "../context/ThemeContext";

const Jumbotron: FC = () => {
  const { theme } = useTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const mobile = isMobile ? "mobile" : "desktop";
  const image =
    theme === "light"
      ? mobile === "mobile"
        ? mobileLight
        : desktopLight
      : mobile === "mobile"
        ? mobileDark
        : desktopDark;

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className={`relative z-0 h-[27vh] bg-cover bg-center bg-no-repeat`}
    ></div>
  );
};

export default Jumbotron;
