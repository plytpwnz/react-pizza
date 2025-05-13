import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../../components/PizzaBlock/PizzaBlock';
import type { RootState } from '../store';

export interface CartState {
  totalPrice: number;
  items: any[];
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<any>) {
      const findItem: any = state.items.find((obj: Item) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        //@ts-ignore
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum: number, obj: any) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action) {
      const findItem: any = state.items.find((obj: Item) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice = state.items.reduce((sum: number, obj: any) => {
          return obj.price * obj.count + sum;
        }, 0);
      }
    },
    removeItem(state, action: PayloadAction<any>) {
      state.items = state.items.filter((obj: Item) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum: number, obj: any) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj: Item) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
