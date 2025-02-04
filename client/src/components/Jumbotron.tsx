import { useMediaQuery } from 'usehooks-ts';
import { useTheme } from '../context/ThemeContext';
import { desktopDark, desktopLight, mobileDark, mobileLight } from '../assets/images/backgrounds';
import { FC } from 'react';

const Jumbotron:FC = () => {
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

  return (
    <div style={{ backgroundImage: `url(${image})` }} className={`relative h-[27vh] bg-no-repeat bg-cover bg-center z-0`}></div>
  );
};

export default Jumbotron;
