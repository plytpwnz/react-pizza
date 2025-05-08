import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import axios from "axios";

export default function Home() {
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const { data } = await axios.get('https://681b8d1817018fe5057bff3f.mockapi.io/items');
          setItems(data);
          setIsLoading(false);
        } catch (error) {
          alert('Ошибка при запросе данных.');
          console.log(error);
        }
      }
      window.scrollTo(0, 0)
      fetchData();
    }, []);
  

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}
