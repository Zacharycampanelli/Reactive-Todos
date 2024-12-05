import { useState } from "react"

import './index.css'
function App() {
  const [theme, setTheme] = useState('light')

  return (
    <div className={`${theme} p-6`}>
      <div className="bg-background w-full">
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>change</button>
      </div>
     
    </div>
  )
}

export default App
