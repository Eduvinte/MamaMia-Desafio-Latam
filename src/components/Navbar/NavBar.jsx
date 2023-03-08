import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillCartFill } from "react-icons/bs";
import Pizza from '../../images/logo.png';
import {Link} from 'react-router-dom'

// Contexte
import { useContext } from 'react';
import { DataContext } from '../Context/MyContext';


function NavBar() {

  const {total} = useContext(DataContext);

  return (
    <div>
      <Navbar className='container_navbar' expand="lg">
        <Container>
          <Link to="/"><img src={ Pizza } width={50} /><span id='titulo_navbar'> Pizza MamaMia!</span></Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >              
            </Nav>
          </Navbar.Collapse>
          <Link to="/Carrito" id='cart_navbar'><BsFillCartFill /> <span className="total_pizza" >${total}</span></Link>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar