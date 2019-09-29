export interface TableTemplate {
  headers: Array<tableHeader>;
  itemsList: Array<any>;
  itemsUtils: Array<itemUtils>;
  chosenIndex?: number;
  keyboardShortcuts?:any
}

interface tableHeader {
  text: string;
}

interface itemUtils {
  value: string;
  callback: any;
}
