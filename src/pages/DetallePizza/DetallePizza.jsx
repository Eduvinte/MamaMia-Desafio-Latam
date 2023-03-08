import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { DataContext } from '../../components/Context/MyContext'
import { useParams } from 'react-router-dom'
import { BsFillCartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaPizzaSlice } from 'react-icons/fa'

function DetalhePizza() {


  const { pizzas, setPizzas, setTotal } = useContext(DataContext)
  const { id } = useParams()
  const [data, setData] = useState([])
  const [dataId, setDataId] = useState([])



  useEffect(() => {
    axios.get('https://eduvinte.github.io/json/pizzas.json?rand=${Math.random()}')
      .then(response => setData(response.data))
      .catch(error => console.log(error))
    console.log(data)
    console.log(id)

  }, [])

  useEffect(() => {
    const pizzaId = data.filter(p => p.id === id)
    setDataId(pizzaId)
    console.log(pizzaId)
  }, [data])


  useEffect(() => {

    const newTotal = pizzas.map((p) => p.newPrice * p.cantidad).reduce((cal1, cal2) => cal1 + cal2, 0);

    setTotal(newTotal)

    console.log(pizzas)

  }, [pizzas])

  function handlePrice(id, newPrice, name, img) {
    const index = pizzas.findIndex(p => p.id === id);
    const cantidad = index >= 0 ? pizzas[index].cantidad + 1 : 1;
  
    if (index >= 0) {
      const newPizzas = [...pizzas];
      newPizzas[index] = { ...newPizzas[index], cantidad };
      setPizzas(newPizzas);
    } else {
      setPizzas([...pizzas, { id, newPrice, name, img, cantidad }]);
    }
  
    if (setPizzas) {
      document.querySelector('.agregado').style.opacity = '1';
      setTimeout(() => {
        document.querySelector('.agregado').style.opacity = '0';
      }, 2000);
    } else {
      alert('Hubo un error');
    }
  }



  return (
    <div>
      {dataId.map(pizzas => {
        return (
          <div id="pizzas_detalles" key={pizzas.id}>
            <div id="img_detalles_pizzas">
              <img src={pizzas.img} alt={pizzas.name} id='img_detalles' />
            </div>
            <div id="contenida_detalles_pizzas">
              <h1>{pizzas.name}</h1>
              <p>{pizzas.desc}</p>
              <h5>Ingredientes:</h5>
              <ul>
                {pizzas.ingredients.map((ingredients, index) => (
                  <li key={index}><FaPizzaSlice /> {ingredients}</li>
                ))}
              </ul>
              <div id="precio_anadir">
                <h4>$ {pizzas.price}</h4>
                <button className='btn btn-danger' onClick={() => handlePrice(pizzas.id, pizzas.price, pizzas.name, pizzas.img)}><BsFillCartFill /> Añadir</button>
              </div>
            </div>
            <div className="agregado">
              <span id='msg_agregado' >Agregado en el carro con sucesso <Link to="/Carrito" id='go_to_car'>Ir al Carro</Link></span>
            </div>
          </div>

        )
      })}
    </div>
  )
}

export default DetalhePizza
