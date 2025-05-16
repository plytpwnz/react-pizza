import type { CartItem } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum: number, obj) => obj.price * obj.count + sum, 0);
};
