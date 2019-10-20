import { Icon } from '../Classes/Icon';

export interface SidebarItem {
    title: string;
    route: string;
    requireLogin: boolean;
    clickEvent?: Function;
    adminUser?: boolean;
    param?: string | number;
    Icon?: Icon;
}
