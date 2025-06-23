import { useLocation } from 'react-router-dom';
import { NavItemType } from '../../types/navigation';
import { ButtonSecondary } from '../UI/buttons';

interface IProps {
  navItem: NavItemType; 
}

const NavigationItem = ({ 
  navItem
}: IProps ) => {
  const location = useLocation();
  const isActive = navItem.href === location.pathname;

  const baseButtonClasses = 'border !rounded-2xl border-blue-400 bg-blue-100 transition';

  return (
    <>
      <ButtonSecondary
        href={navItem.href}
        className={` ${isActive ? 'bg-blue-600 text-white' : ''} ${baseButtonClasses}`}
      >
        {navItem.name}
      </ButtonSecondary>
    </>
  );
}

export default NavigationItem;
