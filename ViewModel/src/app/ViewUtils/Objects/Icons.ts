import { Icon } from '../Classes/Icon';

export const icons = {
    showPassword: new Icon('visibility', 'show password', {
        style: {
            position: 'absolute',
            'margin-top': '10px'
        }
    }),
    hidePassword: new Icon('visibility_off', 'hide password', {
        style: {
            position: 'absolute',
            'margin-top': '10px'
        }
    }),
    expand: new Icon('expand_more', 'expand', {
        style: { color: 'white' }
    }),
    collapse: new Icon('expand_less', 'collapse', {
        style: { color: 'white' }
    }),
    toggleSidebar: new Icon('format_list_bulleted', 'Toggle sidebar', {
        style: {
            color: 'white'
        },
        class: 'left iconHover'
    }),
    home: new Icon('home', 'home', {
        class: 'left iconHover'
    }),
    users: new Icon('people', 'users', {
        class: 'left iconHover'
    }),
    password: new Icon('fireplace', 'passwords', {
        class: 'left'
    }),
    addPassword: new Icon('add_to_photos', 'add password', {
        class: 'left'
    }),
    search: new Icon('search', 'toggle search'),
    edit: new Icon('edit', 'edit (ctrl + e)', {
        class: 'iconHover'
    }),
    delete: new Icon('delete', 'delete (ctrl + delete)', {
        class: 'iconHover'
    }),
    download: new Icon('get_app', 'download', {
        class: 'iconHover'
    }),
    more: new Icon('more_horiz', 'menu', {
        class: 'iconHover'
    }),
    exit: new Icon('exit_to_app', 'logout', {
        class: 'iconHover'
    }),
    android: new Icon('android', 'generate', {
        class: 'iconHover'
    }),
    done: new Icon('done', 'done', {
        class: 'iconHover'
    })
};
