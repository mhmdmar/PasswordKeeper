import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { itemUtils } from './Utils';

export interface TableTemplate {
    headers: tableHeader[];
    itemsList: Array<any>;
    itemsUtils: itemUtils[];
    chosenIndex?: number;
    keyboardShortcuts?: ShortcutInput[];
    tableLength?: number;
    changeItemCallback?: Function;
    editableByAdmin: boolean;
}

interface tableHeader {
    text: string;
}
