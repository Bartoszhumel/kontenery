import './App.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Zakup from './pages/Zakup';
import { Navbar } from './components/navbar.tsx';
import { Cart } from './pages/Cart.tsx';
import {Router, Route, Routes } from "react-router-dom";
import {ShopContextProvider} from "./context/shop-context.tsx";

function App() {
  return (
      <ShopContextProvider>

      <div className={"App"}>
              <Navbar/>
            <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="/menu" element={ <Menu/> } />
                <Route path="/koszyk" element ={<Cart/>}/>
                <Route path="/kupno" element={ <Zakup/> } />
            </Routes>
      </div>
    </ShopContextProvider>
  );
}

export default App;
