import { NavLink } from 'react-router-dom';

const Header = () => {
  const baseButtonClasses = 'px-4 py-2 border rounded-md transition'
  return (
    <nav className="flex gap-4 p-4 bg-white shadow-md">
      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          `${baseButtonClasses} ${
            isActive
              ? 'border-blue-600 text-blue-600 bg-blue-100'
              : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
          }`
        }
      >
        Блоги
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) =>
          `${baseButtonClasses} ${
            isActive
              ? 'border-blue-600 text-blue-600 bg-blue-100'
              : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
          }`
        }
      >
        Создать блог
      </NavLink>
    </nav>
  );
}

export default Header;
