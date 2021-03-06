import { useState } from "react";
import { Home } from "./components/Home";


function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`${darkMode ? 'bg-gray-800' : ''} flex justify-center min-h-screen  `}>
      <Home setDarkMode={setDarkMode} darkMode={darkMode} />
    </div>
  );
}

export default App;
