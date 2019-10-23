import { Component, Input, OnInit } from '@angular/core';
import { icons } from '../../ViewUtils/Objects/Icons';
import { DropdownTemplate } from '../../ViewUtils/Interfaces/Templates/DropdownTemplate';
import { dateUtils } from '../../ViewUtils/Objects/DateUtils';
import { DOMHelper } from '../../ViewUtils/Objects/DOM_Utils/DOM_Helper';
import { AllowIn, ShortcutInput } from 'ng-keyboard-shortcuts';
import { TableTemplate } from '../../ViewUtils/Interfaces/Templates/TableTemplate';
import { AuthService } from '../../Services/auth.service';
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
    private tableElementSelectors = {
        inputContainer: '.inputContainer',
        input: '.colInput',
        itemSpan: '.itemField'
    };

    constructor(private Auth: AuthService) {
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
                        this.endColumnEditing();
                    }
                },
                allowIn: [AllowIn.Input]
            },
            {
                key: ['enter'],
                label: 'save column change',
                command: (): void => {
                    if (this.colElementInEdit !== null) {
                        this.changeColumn();
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

    rowClick(index: number) {
        const calcIndex = index + this.tableLength * (this.tableIndex - 1);
        if (calcIndex !== this.template.chosenIndex && this.colElementInEdit) {
            const discard = confirm('Discard changes');
            if (discard) {
                this.endColumnEditing();
                this.template.chosenIndex = calcIndex;
            }
        } else {
            this.template.chosenIndex = calcIndex;
        }
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
        DOMHelper.copyToClipboard(val);
    }

    downloadFile(data): void {
        DOMHelper.downloadFile(data, 'List_' + dateUtils.getDate() + '.csv');
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

    columnClick(event, key): void {
        // editing table is only allowed for Admin users
        if (!this.template.editableByAdmin || !this.Auth.isAdminUser()) {
            return;
        }
        this.editColumn(event, key);
    }
    editColumn(event, key): void {
        if (this.colElementInEdit === null) {
            this.colInEditKey = key;
            this.turnInputVisible(event.target);
        }
    }

    changeColumn(): void {
        // changing column is only allowed to Admin users
        if (!this.Auth.isAdminUser() || !this.colElementInEdit) {
            return;
        }
        this.endColumnEditing(true);
    }

    turnInputVisible(targetElement: HTMLElement): void {
        // sometimes clicking on the div element cause the span to listen to the trigger event
        this.colElementInEdit = this.getSpanDiv(targetElement);

        DOMHelper.turnElementVisible(this.tableElementSelectors.inputContainer, this.colElementInEdit);
        DOMHelper.turnElementInvisible(this.tableElementSelectors.itemSpan, this.colElementInEdit);
        const colInput: HTMLElement = DOMHelper.queryElement(this.tableElementSelectors.input, this.colElementInEdit);
        DOMHelper.focusElement(colInput);
    }

    endColumnEditing(saveEdit = false): void {
        this.turnSpanVisible(saveEdit);
    }

    turnSpanVisible(saveValue = false): void {
        this.colElementInEdit = this.getSpanDiv(this.colElementInEdit);
        const inputContainerElement: any = this.colElementInEdit.querySelector(this.tableElementSelectors.inputContainer);
        const spanElement: HTMLSpanElement = this.colElementInEdit.querySelector(this.tableElementSelectors.itemSpan);
        DOMHelper.turnElementVisible(spanElement);
        DOMHelper.turnElementInvisible(inputContainerElement);
        const colInput: HTMLInputElement = DOMHelper.queryElement(this.tableElementSelectors.input, this.colElementInEdit) as HTMLInputElement;
        if (saveValue) {
            this.saveNewValue(colInput.value);
        } else {
            colInput.value = spanElement.innerHTML;
        }
        this.colElementInEdit = null;
        this.colInEditKey = null;
    }
    saveNewValue(text: string): void {
        this.template.changeItemCallback && this.template.changeItemCallback(this.colInEditKey, text);
    }

    getSpanDiv(targetElement: HTMLElement): HTMLElement {
        return targetElement.tagName === 'SPAN' ? targetElement.parentElement : targetElement;
    }
}
