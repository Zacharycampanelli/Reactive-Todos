import sun from '../images/icon-sun.svg'
import moon from '../images/icon-moon.svg' 
import { useTheme } from '../../context/ThemeContext'
import ToDoInput from './ToDoInput'
import ToDoList from './ToDoList'

const ToDoContainer = () => {
  const { theme, toggleTheme } = useTheme()

  let icon = theme === 'light' ? moon : sun
  
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex justify-between items-center'>
            <h1 className="font-josefin text-[40px] text-white tracking-[15px] z-0">TODO</h1>

            <img src={icon} alt="icon" onClick={toggleTheme} className="cursor-pointer z-10" />
    </div>
            <ToDoInput />
            
<ToDoList />
                </div>
  )
}

export default ToDoContainer
