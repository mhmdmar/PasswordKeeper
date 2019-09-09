import {routesNames} from './routeNames';
import {SidebarItem} from '../ViewUtils/Interfaces/SidebarItem';

export const settings: Array<SidebarItem> = [
  {
    title: 'Home',
    route: routesNames.home,
    requireLogin: false,
    clickEvent() {
    },
  },
  {
    title: 'Table',
    route: routesNames.passwordTable,
    requireLogin: true,
    clickEvent() {
    },
  },
  {
    title: 'Add Password',
    route: routesNames.passwordForm,
    requireLogin: true,
    clickEvent() {
    },
  }
];
