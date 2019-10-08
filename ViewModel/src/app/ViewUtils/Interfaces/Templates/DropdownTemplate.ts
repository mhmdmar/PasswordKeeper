import { Icon } from '../../Classes/Icon';

export interface DropdownTemplate {
    icon?: Icon;
    callback?: Function;
    title?: string;
    options: dropdownOption[];
}

export interface dropdownOption {
    title?: string;
    value: string;
    callback: Function;
}
