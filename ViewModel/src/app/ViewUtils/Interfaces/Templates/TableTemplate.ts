import {ShortcutInput} from 'ng-keyboard-shortcuts';

export interface TableTemplate {
  headers: tableHeader[];
  itemsList: Array<any>;
  itemsUtils: itemUtils[];
  chosenIndex?: number;
  keyboardShortcuts?: ShortcutInput[]
}

interface tableHeader {
  text: string;
}

interface itemUtils {
  value: string;
  callback: Function;
}
