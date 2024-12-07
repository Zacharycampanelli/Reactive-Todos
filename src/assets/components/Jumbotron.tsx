import { useMediaQuery } from 'usehooks-ts';
import { useTheme } from '../../context/ThemeContext';
import { desktopDark, desktopLight, mobileDark, mobileLight } from '../images/backgrounds';

console.log(desktopDark);
const Jumbotron = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const mobile = isMobile ? 'mobile' : 'desktop';
  const image =
    theme === 'light'
      ? mobile === 'mobile'
        ? mobileLight
        : desktopLight
      : mobile === 'mobile'
      ? mobileDark
      : desktopDark;

  return <div style={{ backgroundImage: `url(${image})` }} className={`m-0 p-0 w-full h-[20vh] `}></div>;
};

export default Jumbotron;
