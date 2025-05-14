import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FullPizza() {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizzaById() {
      try {
        const { data } = await axios.get(`https://681b8d1817018fe5057bff3f.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        // alert('Не получилось получить данные о пицце. Повторите попытку позже');
        console.log(error);
        navigate('/');
      }
    }
    fetchPizzaById();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.name}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}
