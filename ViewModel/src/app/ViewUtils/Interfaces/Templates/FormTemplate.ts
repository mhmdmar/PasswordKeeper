import { itemUtils } from './Utils';

export interface FormTemplate {
    inputs: Array<FormTextItem | FormButtonItem>;
    alternativeRoute: AlternativeRoute;
}

interface AlternativeRoute {
    alternativeText: string;
    testID?: string;
    callback: Function;
}

export interface FormTextItem {
    id?;
    class: string;
    type: string;
    placeholder: string;
    field: string;
    testID?: string;
    callback: Function;
    itemsUtils?: itemUtils[];
}

export interface FormButtonItem {
    class: string;
    type: string;
    value: string;
    testID?: string;
    callback: Function;
}
