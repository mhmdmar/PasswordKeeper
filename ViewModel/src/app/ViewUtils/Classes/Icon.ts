export class Icon {

  private _value: string;
  private _title: string;
  private _options: any;

  constructor(value: string, title: string = '', options?: any) {
    this._value = value;
    this._title = title;
    this._options = options;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get options(): any {
    return this._options;
  }

  set options(options: any) {
    this._options = options;
  }
}
