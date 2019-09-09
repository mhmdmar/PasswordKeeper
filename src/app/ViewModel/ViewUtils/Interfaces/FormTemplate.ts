export interface FormTemplate {
  inputs: Array<FormTextItem | FormButtonItem>;
  alternativeRoute: AlternativeRoute;
}

interface AlternativeRoute {
  alternativeText: string;
  callback: any;
}

interface FormTextItem {
  class: string;
  type: string;
  placeholder: string;
  field: string;
  callback: any;
}

interface FormButtonItem {
  class: string;
  type: string;
  value: string;
  callback: any;
}
