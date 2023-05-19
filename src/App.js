import './App.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/menu" element={ <Menu/> } />
        </Routes>
      </>
  );
}

export default App;
