import { Icon } from '../../Classes/Icon';

export interface DropdownTemplate {
    options: dropdownOption[];
    title?: string;
    icon?: Icon;
    callback?: Function;
}

export interface dropdownOption {
    value?: string;
    callback: Function;
    icon?: Icon;
    title?: string;
}
