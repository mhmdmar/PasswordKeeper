import { Component, Input, OnInit } from '@angular/core';
import { icons } from '../../ViewUtils/Objects/Icons';
import { DropdownTemplate } from '../../ViewUtils/Interfaces/Templates/DropdownTemplate';
import { dateUtils } from '../../ViewUtils/Objects/DateUtils';
import { DOMHelper } from '../../ViewUtils/Objects/DOM_Utils/DOM_Helper';
import { AllowIn, ShortcutInput } from 'ng-keyboard-shortcuts';
import { TableTemplate } from '../../ViewUtils/Interfaces/Templates/TableTemplate';
import { firstLetterUppercase } from '../../ViewUtils/Objects/StringUtils';
const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() template: TableTemplate;
    private tableDropdown: DropdownTemplate;
    private searchTerm: string;
    private tableLength: number;
    private tableIndex: number;
    private filteredItemsList: object[];
    private colElementInEdit: HTMLElement = null;
    private colInEditKey: string;
    public shortcuts: ShortcutInput[];

    public icons = icons;
    public firstLetterUppercase = firstLetterUppercase;

    constructor() {
        this.searchTerm = '';
        this.tableIndex = 1;
        this.filteredItemsList = [];
        this.tableDropdown = this.getDropdownTemplate();
    }
    tableShortcuts(): ShortcutInput[] {
        return [
            {
                key: ['up'],
                label: 'select the above password item',
                command: (): void => {
                    if (this.template.chosenIndex !== null) {
                        const chosenIndex = this.template.chosenIndex % this.tableLength;
                        chosenIndex && this.template.chosenIndex--;
                    }
                },
                preventDefault: true
            },
            {
                key: ['down'],
                label: 'select the below password item',
                command: (): void => {
                    if (this.template.chosenIndex !== null) {
                        const chosenIndex = this.template.chosenIndex % this.tableLength;
                        chosenIndex < this.filteredItemsList.length - 1 && this.template.chosenIndex++;
                    }
                },
                preventDefault: true
            },
            {
                key: ['right'],
                label: 'show more items',
                command: (): void => {
                    this.filteredItemsList.length >= this.tableLength && this.nextList();
                },
                preventDefault: true
            },
            {
                key: ['left'],
                label: 'show more items',
                command: (): void => {
                    this.tableIndex > 1 && this.prevList();
                },
                preventDefault: true
            },
            {
                key: ['escape'],
                label: 'exit column edit mode',
                command: (): void => {
                    if (this.colElementInEdit !== null) {
                        this.turnSpanVisible(this.colElementInEdit, false);
                    }
                },
                allowIn: [AllowIn.Input]
            }
        ];
    }
    getDropdownTemplate(): DropdownTemplate {
        return {
            icon: icons.more,
            options: [
                {
                    icon: icons.download,
                    value: 'Download List',
                    title: 'Download List',
                    callback: () => {
                        const csvData = this.arrayToCSV(this.template.itemsList);
                        this.downloadFile(csvData);
                    }
                },
                {
                    icon: icons.android,
                    value: 'Generate Password',
                    title: 'Generate Password',
                    callback: () => {
                        const password: string = this.generatePassword(12, charSet);
                        if (confirm(`copy to clipboard - ${password}`)) {
                            this.copyToClipboard(password);
                        }
                    }
                }
            ]
        };
    }
    ngOnInit() {
        this.shortcuts = this.template.keyboardShortcuts.concat(this.tableShortcuts());
        this.tableLength = this.template.tableLength || 10;
        this.template.chosenIndex = (this.tableIndex - 1) * this.tableLength;
    }

    filterItemsList(): Array<object> {
        this.filteredItemsList = this.template.itemsList
            .filter(item => {
                return Object.keys(item).some(attribute => {
                    return item[attribute]
                        .toString()
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase());
                });
            })
            .splice((this.tableIndex - 1) * this.tableLength, this.tableLength);
        return this.filteredItemsList;
    }

    updateSearchTerm(searchTerm): void {
        this.searchTerm = searchTerm;
    }
    nextList(): void {
        this.tableIndex++;
        this.template.chosenIndex = (this.tableIndex - 1) * this.tableLength;
    }
    prevList(): void {
        this.tableIndex--;
        this.template.chosenIndex = (this.tableIndex - 1) * this.tableLength;
    }

    generatePassword(length = 12, charSet): string {
        if (!charSet) {
            throw new Error('charset is not supplied');
        }
        return Array.apply(null, Array(length || 10))
            .map(function() {
                return charSet.charAt(Math.random() * charSet.length);
            })
            .join('');
    }

    copyToClipboard(val: string) {
        const element = DOMHelper.createHiddenElement('textarea') as HTMLTextAreaElement;
        element.value = val;
        element.setAttribute('readonly', '');
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element);
    }

    downloadFile(data): void {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const element = DOMHelper.createHiddenElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', 'List_' + dateUtils.getDate() + '.csv');
        element.click();
        document.body.removeChild(element);
    }

    arrayToCSV(data: string[]): any {
        const csvData: string[] = [];
        // get the headers
        const headers: string[] = Object.keys(data[0]);
        csvData.push(headers.join(','));

        // loop over the rows
        for (const row of data) {
            csvData.push(
                headers
                    .map(header => {
                        // escape quotes to match CSV format
                        const escapedHeader = row[header].toString().replace(/"/g, '\\"');
                        return `"${escapedHeader}"`;
                    })
                    .join(',')
            );
        }
        return csvData.join('\n');
    }

    editColumn(event, key) {
        if (this.colElementInEdit === null) {
            this.colInEditKey = key;
            this.turnInputVisible(event.target);
        }
    }
    changeColumn() {
        const inputContainerElement: any = this.colElementInEdit.querySelector('.inputContainer');
        const newVal = inputContainerElement.querySelector('input').value;
        this.template.changeItemCallback && this.template.changeItemCallback(this.colInEditKey, newVal);
        this.turnSpanVisible(this.colElementInEdit, true);
    }
    turnInputVisible(targetElement: HTMLElement) {
        // sometimes clicking on the div element cause the span to listen to the trigger event
        targetElement = this.getColDiv(targetElement);
        const inputContainerElement: any = targetElement.querySelector('.inputContainer');
        const spanElement: HTMLSpanElement = targetElement.querySelector('span');
        spanElement.style.display = 'none';
        inputContainerElement.style.display = 'block';
        this.colElementInEdit = targetElement;
    }
    turnSpanVisible(targetElement: HTMLElement, saveValue = false) {
        targetElement = this.getColDiv(targetElement);
        const inputContainerElement: any = targetElement.querySelector('.inputContainer');
        const spanElement: HTMLSpanElement = targetElement.querySelector('span');
        spanElement.style.display = 'block';
        inputContainerElement.style.display = 'none';
        if (!saveValue) {
            inputContainerElement.querySelector('input').value = spanElement.innerHTML;
        }
        this.colElementInEdit = null;
        this.colInEditKey = null;
    }
    getColDiv(targetElement: HTMLElement) {
        return targetElement.tagName === 'SPAN' ? targetElement.parentElement : targetElement;
    }
}
