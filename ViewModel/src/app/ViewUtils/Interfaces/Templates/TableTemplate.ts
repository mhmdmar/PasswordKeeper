import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { itemUtils } from './Utils';
import { DropdownTemplate } from './DropdownTemplate';

export interface TableTemplate {
    headers: tableHeader[];
    itemsList: Array<any>;
    itemsUtils: itemUtils[];
    chosenIndex?: number;
    keyboardShortcuts?: ShortcutInput[];
    tableLength?: number;
    changeItemCallback?: Function;
    editableByAdmin: boolean;
    dropdownUtils?: DropdownTemplate;
}

interface tableHeader {
    text: string;
}
