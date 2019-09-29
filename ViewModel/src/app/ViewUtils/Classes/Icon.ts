export class Icon {
  private _value: string;
  private _title: string;

  constructor(value: string, title: string = '') {
    this._value = value;
    this._title = title;
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
}
