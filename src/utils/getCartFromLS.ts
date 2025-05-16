import type { CartItem } from '../redux/slices/cartSlice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items: CartItem[] = data ? JSON.parse(data) : [];
  const totalPrice: number = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
