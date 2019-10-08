import { Component, Input, OnInit } from '@angular/core';
import { icons } from '../../ViewUtils/Objects/Icons';
import { DropdownTemplate } from '../../ViewUtils/Interfaces/Templates/DropdownTemplate';
import { dateUtils } from '../../ViewUtils/Objects/DateUtils';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() template;
    private tableDropdown: DropdownTemplate;
    private searchTerm: string;

    constructor() {
        this.searchTerm = '';
        this.tableDropdown = this.getDropdownTemplate();
    }

    getDropdownTemplate(): DropdownTemplate {
        return {
            icon: icons.password,
            options: [
                {
                    value: 'Download List',
                    title: 'Download List',
                    callback: () => {
                        const csvData = this.arrayToCSV(this.template.itemsList);
                        this.downloadFile(csvData);
                    }
                }
            ]
        };
    }
    ngOnInit() {}

    getKeys(obj) {
        return Object.keys(obj);
    }

    filterList(): Array<object> {
        return this.template.itemsList.filter(item => {
            return this.getKeys(item).some(attribute => {
                return item[attribute].toString().includes(this.searchTerm);
            });
        });
    }

    updateSearchTerm(searchTerm): void {
        this.searchTerm = searchTerm;
    }

    downloadFile(data): void {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'PasswordsList_' + dateUtils.getDate() + '.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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
}
