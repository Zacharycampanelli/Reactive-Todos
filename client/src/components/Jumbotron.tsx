import { useMediaQuery } from 'usehooks-ts';
import { useTheme } from '../context/ThemeContext';
import { desktopDark, desktopLight, mobileDark, mobileLight } from '../assets/images/backgrounds';
import { FC } from 'react';

interface JumbotronProps {
  setModalOption: (option: 'login' | 'signup') => void;
  setModalOpen: (open: boolean) => void;
}

const Jumbotron:FC<JumbotronProps> = ({setModalOption, setModalOpen}) => {
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

      const modalSetup = (option: 'login' | 'signup') => {
        setModalOption(option);
        setModalOpen(true);
      }

  return (
    <div style={{ backgroundImage: `url(${image})` }} className={`relative h-[27vh] bg-no-repeat bg-cover bg-center z-0`}>
      <button onClick={() => modalSetup('signup')} className="absolute top-5 right-5 text-white bg-primary rounded-md px-4 py-2 font-josefin">
        Sign Up
      </button>
      <button onClick={() => modalSetup('login')} className="absolute top-5 right-28 text-white bg-primary rounded-md px-4 py-2 font-josefin">
        Log In
      </button>
    </div>
  );
};

export default Jumbotron;
