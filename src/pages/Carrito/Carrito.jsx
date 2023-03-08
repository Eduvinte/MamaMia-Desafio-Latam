import React, { useEffect } from 'react'
import { useContext } from 'react'
import { DataContext } from '../../components/Context/MyContext'
import { Link } from 'react-router-dom'

function Carrito() {

  const { pizzas, setPizzas, setTotalCarrito, totalCarrito, total, setTotal } = useContext(DataContext);




  function habdleDeletePizza(id, newPrice, name, img, cantidad = 0, operation, priceFijo) {
    const index = pizzas.findIndex(p => p.id === id);

    if (index >= 0) {
      const newPizzas = [...pizzas];

      if (operation === '-') {
        // Restar una pizza
        if (newPizzas[index].cantidad === 1) {
          // Eliminar la pizza si la cantidad llega a 0
          newPizzas.splice(index, 1);
        } else {
          // Actualizar la cantidad
          newPizzas[index] = { ...newPizzas[index], cantidad: newPizzas[index].cantidad - 1 };
        }

        const newPrice = newPizzas.map((p) => p.newPrice * p.cantidad).reduce((cal1, cal2) => cal1 + cal2, 0);
        setTotalCarrito(newPrice);
        setTotal(newPrice);

      } else if (operation === '+') {
        // Agregar una pizza
        newPizzas[index] = { ...newPizzas[index], cantidad: newPizzas[index].cantidad + 1 };

        const newPrice = newPizzas.map((p) => p.newPrice * p.cantidad).reduce((cal1, cal2) => cal1 + cal2, 0);
        setTotalCarrito(newPrice);
        setTotal(newPrice);
      }

      setPizzas(newPizzas);
    } else {
      setPizzas(prevPrices => [...prevPrices, { id, newPrice, name, img, cantidad: 1 }]);
    }
  }


  return (
    <>
      {pizzas.map((pizza, index) => {
        
        const existingIndex = pizzas.findIndex(item => item.id === pizza.id);

        if (existingIndex === index) {
          return (
            <div key={pizza.id}>
              <div className="container_carrito_primary">
                <div className="container_carrito">
                  <img src={pizza.img} alt={pizza.name} width={160} />
                  <h2>{pizza.name}</h2>

                  <div id="cantidad_pizza">
                    <button className="btn btn-danger" onClick={() => habdleDeletePizza(pizza.id, pizza.newPrice, pizza.name, pizza.img, pizza.cantidad, '-')}>
                      -
                    </button>
                    <span>{pizza.cantidad}</span>
                    <button className="btn btn-primary" onClick={() => habdleDeletePizza(pizza.id, pizza.newPrice, pizza.name, pizza.img, pizza.cantidad, '+')}>
                      +
                    </button>
                  </div>

                  <p>Precio: ${pizza.newPrice * pizza.cantidad}</p>
                </div>
              </div>

            </div>

          );
        } else {
          // Devuelve un elemento vacío en lugar de null
          return <React.Fragment key={`empty-${index}`} />;
        }
      })}
      {/* Muestra un mensaje si no hay pizzas en el carrito */}
      {pizzas.length === 0 && (
        <div className="container_Dont_Have_Pizza">
          <div className="msg_Dont_Have_Pizza">
            <h1>No hay pizzas en el carrito <Link to='/'>Comprar ahora!</Link></h1>
          </div>
        </div>
      )}
    </>
  )
}


export default Carrito