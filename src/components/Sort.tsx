import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort, type SortItem } from '../redux/slices/filterSlice';

export const sortList: SortItem[] = [
  { name: 'популярности (▼)', sortProperty: 'rating' },
  { name: 'популярности (▲)', sortProperty: '-rating' },
  { name: 'цене (▼)', sortProperty: 'price' },
  { name: 'цене (▲)', sortProperty: '-price' },
  { name: 'алфавиту (▼)', sortProperty: 'title' },
  { name: 'алфавиту (▲)', sortProperty: '-title' },
];

type SortProps = {
  value: SortItem;
};

export default function Sort({ value }: SortProps) {
  const [open, setOpen] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen((prev) => !prev)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj) => (
              <li
                key={obj.name}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}
                onClick={() => onClickListItem(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
