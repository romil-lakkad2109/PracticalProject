import Splash from './Splash';
import BottomBar from './Bottombar';
import Login from './Authentication/Login';

//BOTTOM
import search from './Search/search';
import Events from './Events/Events';
import Favourites from './Favourites/Favourites';
import Profile from './Profile/Profile';

export const SCREENS = {
  Splash: {
    identifier: 'Splash',
    component: Splash,
  },
  BottomBar: {
    identifier: 'BottomBar',
    component: BottomBar,
  },
  Login: {
    identifier: 'Login',
    component: Login,
  }
};

export const TABS = {
  search: {
    identifier: 'search',
    component: search,
  },
  Events: {
    identifier: 'Events',
    component: Events,
  },

  Favourites: {
    identifier: 'Favourites',
    component: Favourites,
  },
  Profile: {
    identifier: 'Profile',
    component: Profile,
  },
};


export default SCREENS;
