import { NAVIGATION_GLOBAL } from '../../types/navigation';
import NavigationItem from './NavigationItem';

const Navigation = () => {
  return (
    <>
      {NAVIGATION_GLOBAL.map((nav, index) => 
        <NavigationItem navItem={nav} key={index} />
      )}
    </>
  );
}

export default Navigation;
