import {Icon} from '../../Classes/Icon';

export interface FormTemplate {
  inputs: Array<FormTextItem | FormButtonItem>;
  alternativeRoute: AlternativeRoute;
}

interface AlternativeRoute {
  alternativeText: string;
  testID?: string;
  callback: any;
}

interface FormTextItem {
  id?
  class: string;
  type: string;
  placeholder: string;
  field: string;
  testID?: string;
  callback: any;
  itemsUtils?: Array<itemUtils>;
}

interface FormButtonItem {
  class: string;
  type: string;
  value: string;
  testID?: string;
  callback: any;
}

interface itemUtils {
  icon: Icon;
  callback: any;
}
