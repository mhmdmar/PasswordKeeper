import {routesNames} from './routeNames';
import {SidebarItem} from '../Interfaces/SidebarItem';

export const settings: Array<SidebarItem> = [
  {
    title: 'Home',
    route: routesNames.home,
    requireLogin: false
  },
  {
    title: 'Users',
    route: routesNames.usersTable,
    requireLogin: true,
    accessLevel: 1
  },
  {
    title: 'Table',
    route: routesNames.passwordTable,
    requireLogin: true,
  },
  {
    title: 'Add Password',
    route: routesNames.passwordForm,
    param: '',
    requireLogin: true,
  }
];
