import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort, type FilterState } from '../redux/slices/filterSlice';

export const sortList = [
  { name: 'популярности (▼)', sortProperty: 'rating' },
  { name: 'популярности (▲)', sortProperty: '-rating' },
  { name: 'цене (▼)', sortProperty: 'price' },
  { name: 'цене (▲)', sortProperty: '-price' },
  { name: 'алфавиту (▼)', sortProperty: 'title' },
  { name: 'алфавиту (▲)', sortProperty: '-title' },
];

export default function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: FilterState) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.composedPath().includes(sortRef.current)) {
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
        <span onClick={() => setOpen((prev) => !prev)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj: any) => (
              <li
                key={obj.name}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
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
