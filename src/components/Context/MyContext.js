import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createContext } from 'react';

export const DataContext = createContext([])

export const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0)
    const [pizzas, setPizzas] = useState([])
    const [totalCarrito, setTotalCarrito] = useState(0)
  

 
    

    useEffect(() => {
        axios
        .get('http://localhost:3002/pizzas')
        .then( response => setData(response.data))
        .catch(error => console.log(error));
    }, [])

    return (
        <DataContext.Provider value={{data, total, setTotal, pizzas, setPizzas, totalCarrito, setTotalCarrito}} >
            {children}
        </DataContext.Provider>
    )

}