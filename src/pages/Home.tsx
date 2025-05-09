import { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import axios from 'axios';
import Pagination from '../components/Pagination/Pagination';
import SearchContext from '../context';

export default function Home() {
  const { searchValue }: any = useContext(SearchContext);
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
        const search = searchValue ? `&search=${searchValue.trim()}` : '';

        const { data } = await axios.get(
          `https://681b8d1817018fe5057bff3f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
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
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items
    // .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(index: number) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(obj: any) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
    </div>
  );
}
