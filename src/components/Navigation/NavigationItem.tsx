import { useLocation } from 'react-router-dom';
import { NavItemType } from '../../types/navigation';
import { ButtonPrimary } from '../UI/buttons';

interface IProps {
  navItem: NavItemType; 
}

const NavigationItem = ({ 
  navItem
}: IProps ) => {
  const location = useLocation();
  const isActive = navItem.href === location.pathname;

  return (
    <>
      <ButtonPrimary
        href={navItem.href}
        className={` ${isActive ? '!border-gray-600 bg-gray-600 !text-white' : ''}`}
      >
        {navItem.name}
      </ButtonPrimary>
    </>
  );
}

export default NavigationItem;
