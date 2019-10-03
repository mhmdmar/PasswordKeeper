import {routesNames} from './routeNames';
import {SidebarItem} from '../Interfaces/SidebarItem';
import {icons} from './Icons';

export const sidebarItems: Array<SidebarItem> = [
  {
    title: 'Home',
    route: routesNames.home,
    requireLogin: false,
    icon: icons.home
  },
  {
    title: 'Users',
    route: routesNames.usersTable,
    requireLogin: true,
    accessLevel: 1,
    icon: icons.users
  },
  {
    title: 'Table',
    route: routesNames.passwordTable,
    requireLogin: true,
    icon: icons.password
  },
  {
    title: 'Add Password',
    route: routesNames.passwordForm,
    param: '',
    requireLogin: true,
    icon: icons.addPassword
  }
];
