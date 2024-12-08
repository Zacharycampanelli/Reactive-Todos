import sun from '../images/icon-sun.svg'
import moon from '../images/icon-moon.svg' 
import { useTheme } from '../../context/ThemeContext'

const ToDoContainer = () => {
  const { theme, toggleTheme } = useTheme()

  let icon = theme === 'light' ? moon : sun
  
  return (
    <div>
      <div className='w-full flex justify-between items-center'>
            <h1 className="font-josefin text-[40px] text-white tracking-[15px]">TODO</h1>
            <img src={icon} alt="icon" onClick={toggleTheme} className="cursor-pointer" />
    </div>
    </div>
  )
}

export default ToDoContainer
