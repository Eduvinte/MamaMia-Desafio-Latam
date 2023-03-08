import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../components/Context/MyContext'
import { FaPizzaSlice } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';



function Home() {
  const navigation = useNavigate();
  const {data, setTotal, pizzas, setPizzas} = useContext(DataContext)
 // const [prices, setPrice] = useState([])

  useEffect(() => {
    console.log(data)
  }, [data])


  useEffect(() => {

    const newTotal = pizzas.map((p) => p.newPrice * p.cantidad).reduce((cal1, cal2) => cal1 + cal2, 0);

    setTotal(newTotal)

    console.log(pizzas)

  }, [pizzas])


  function handlePrice(id, newPrice, name, img, cantidad = 1){

    const index = pizzas.findIndex(p => p.id === id);

    if (index >= 0) {

      const newPizzas = [...pizzas];
      
      newPizzas[index] = {...newPizzas[index], cantidad: newPizzas[index].cantidad + 1};

      setPizzas(newPizzas);

    } else {

      setPizzas(prevPrices => [...prevPrices, {id, newPrice, name, img, cantidad}]);

    }

    if(setPizzas){
      document.querySelector('.agregado').style.opacity = '1'
      setTimeout(() => {
        document.querySelector('.agregado').style.opacity = '0'
      }, 2000)
    }else {
      alert('Hubo un error')
    }
   
  }

  const handleViewDetail = (id) => {
    navigation(`/DetallePizza/${id}`)
  }

  return (
    <div>
      <div className="container_home">
        <h1>Las mejores pizzas de Santiago de Chile</h1>
        <hr />
      </div>

      <div className="container_pizzas">
        {data.map(pizzas => {
          return (
            <>
              <div className="list_pizzas" key={pizzas.id} >
                <img src={pizzas.img} alt="pizzas" width={250} />
                <h6>{pizzas.name}</h6>
                <div className="list">
                  <hr />
                  <ul>
                    {pizzas.ingredients.map((ingredient, index) => (
                      <li key={index}><FaPizzaSlice /> {ingredient}</li>
                    ))}
                  </ul>

                </div>
                <hr />
                <h6 style={{ textAlign: 'center' }}>${pizzas.price}</h6>
                <button className='btn btn-primary' onClick={() => handleViewDetail(pizzas.id)} style={{ marginRight: '5px' }}>Ver detalles</button>
                <button className='btn btn-danger' onClick={() => handlePrice(pizzas.id, pizzas.price, pizzas.name, pizzas.img)}>Añadir</button>
              </div>
            </>

          )
        })}

      </div>

        <div className="agregado">
          <span id='msg_agregado' >Agregado en el carro con sucesso <Link to="/Carrito" id='go_to_car'>Ir al Carro</Link></span>
        </div>
    </div>
  )
}

export default Home