import './scss/app.scss';
import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
// import pizzas from './assets/pizzas.json'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Skeleton from './components/PizzaBlock/Skeleton';

export default function App() {
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    async function fetchData() {
      try {
        const { data } = await axios.get('https://681b8d1817018fe5057bff3f.mockapi.io/items')
        setItems(data)
      } catch (error) {
        alert('Ошибка при запросе данных.')
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}
