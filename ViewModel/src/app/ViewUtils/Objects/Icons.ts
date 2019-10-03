import {Icon} from '../Classes/Icon';

export const icons = {
  showPassword: new Icon('visibility', 'show password', {
    style: {
      'position': 'absolute',
      'margin-top': '10px'
    }
  }),
  hidePassword: new Icon('visibility_off', 'hide password', {
    style: {
      'position': 'absolute',
      'margin-top': '10px'
    }
  }),
  expand: new Icon('expand_more', 'expand',
    {
      style: {color: 'white'}
    }),
  collapse: new Icon('expand_less', 'collapse', {
    style: {color: 'white'}
  }),
  toggleSidebar: new Icon('format_list_bulleted', 'Toggle sidebar', {
    style: {
      'color': 'white',
      'float': 'left'
    }
  }),
  home: new Icon('home', 'home', {
    style: {
      'float': 'left'
    }
  }),
  users: new Icon('people', 'users', {
    style: {
      'float': 'left'
    }
  }),
  password: new Icon('fireplace', 'passwords', {
    style: {
      'float': 'left'
    }
  }),
  addPassword: new Icon('add_to_photos', 'add password', {
    style: {
      'float': 'left'
    }
  }),

};
