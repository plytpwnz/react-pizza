import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import axios from 'axios';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности (▼)',
    sortProperty: 'rating',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId !== 0 ? `category=${categoryId}` : '';

        const { data } = await axios.get(
          `https://681b8d1817018fe5057bff3f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
        );
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе данных.');
        console.log(error);
      }
    }
    window.scrollTo(0, 0);
    fetchData();
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(index: number) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(obj: any) => setSortType(obj)} />
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
