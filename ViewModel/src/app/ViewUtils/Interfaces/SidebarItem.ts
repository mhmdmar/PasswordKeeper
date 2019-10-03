import {Icon} from '../Classes/Icon';

export interface SidebarItem {
  title: string;
  route: string;
  requireLogin: boolean;
  clickEvent?: any;
  accessLevel?: number;
  param?: string | number;
  icon?: Icon
}
