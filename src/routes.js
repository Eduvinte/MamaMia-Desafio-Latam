import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages, componentes
import Home from './pages/Home/Home';
import DetallePizza from './pages/DetallePizza/DetallePizza';
import Carrito from './pages/Carrito/Carrito';

import NavBar from './components/Navbar/NavBar';
function RouteApp() {
    return (
        <BrowserRouter>
          <NavBar />
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/DetallePizza/:id' element={ <DetallePizza /> } />
                <Route path='/Carrito' element={ <Carrito /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteApp;