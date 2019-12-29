import { Icon } from '../../Classes/Icon';

export interface DropdownTemplate {
    options: dropdownOption[];
    title?: string;
    icon?: Icon;
    testId?: string;
    callback?: Function;
}

export interface dropdownOption {
    value?: string;
    callback: Function;
    icon?: Icon;
    title?: string;
}
