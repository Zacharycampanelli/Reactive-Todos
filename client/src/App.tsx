import { ThemeProvider } from './context/ThemeContext';
import Jumbotron from './components/Jumbotron';
import ToDoContainer from './components/ToDoContainer';
import ThemeContainer from './components/ThemeContainer';
import { TodoProvider } from './context/ToDoContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <ThemeContainer>
          <Jumbotron />
          <div className="size-full min-h-screen px-6 -mt-[18vh] bg-dividerCircle -z-30 font-josefin">
            <ToDoContainer />
          </div>
        </ThemeContainer>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
