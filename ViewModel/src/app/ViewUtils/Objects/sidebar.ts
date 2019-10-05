import {routesNames} from './routeNames';
import {SidebarItem} from '../Interfaces/SidebarItem';
import {icons} from './Icons';

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Home',
    route: routesNames.home,
    requireLogin: false,
    Icon: icons.home
  },
  {
    title: 'Users',
    route: routesNames.usersTable,
    requireLogin: true,
    accessLevel: 1,
    Icon: icons.users
  },
  {
    title: 'Table',
    route: routesNames.passwordTable,
    requireLogin: true,
    Icon: icons.password
  },
  {
    title: 'Add Password',
    route: routesNames.passwordForm,
    param: '',
    requireLogin: true,
    Icon: icons.addPassword
  }
];
