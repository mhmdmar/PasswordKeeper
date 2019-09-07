import {routesNames} from './routeNames';

export const settings = [
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
