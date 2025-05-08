export default function Categories({ value, onChangeCategory }: any) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
            key={categoryName}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
