export interface TableTemplate {
  headers: Array<tableHeader>;
  rows: Array<any>;
  itemsUtils: Array<itemUtils>;
  choseItem?: any;
  chosenIndex?: number;
}

interface tableHeader {
  text: string;
}

interface itemUtils {
  value: string;
  callback: any;
}
