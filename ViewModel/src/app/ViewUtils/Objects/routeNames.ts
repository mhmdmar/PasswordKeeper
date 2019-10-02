export const routesNames: any = {
  passwordTable: {
    value: 'passwordTable',
  },
  default: {
    value: '',
  },
  home: {
    value: 'home',
  },
  login: {
    value: 'login',
  },
  signUp: {
    value: 'signUp',
  },
  passwordForm: {
    value: 'passwordForm',
    param: '/:id'
  },
  usersTable: {
    value: 'usersTable',
  },
};

const computePath = (route: any): string => {
  return route.value + (route.param !== undefined ? route.param : '');
};

const routeKeys = Object.keys(routesNames);
export const routesPath:any = {};
for (let route of routeKeys) {
  routesPath[route] = computePath(routesNames[route]);
}
