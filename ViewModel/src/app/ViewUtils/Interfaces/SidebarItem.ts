import {Icon} from '../Classes/Icon';

export interface SidebarItem {
  title: string;
  route: string;
  requireLogin: boolean;
  clickEvent?: Function;
  accessLevel?: number;
  param?: string | number;
  Icon?: Icon
}
