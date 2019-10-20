export const DOMHelper = {
    customSelector(selector: string, value: string): string {
        return '['.concat(selector, '="', value, '"]');
    },
    testIdSelector(testID: string) {
        return this.customSelector('test-id', testID);
    },
    createHiddenElement(elementTag: string): HTMLElement {
        const element = document.createElement(elementTag);
        element.style.position = 'absolute';
        element.style.left = '-9999px';
        document.body.appendChild(element);
        return element;
    },
    removeElement(element: HTMLElement | string) {
        const elementToRemove = this.queryElement(element) as Node;
        document.body.removeChild(elementToRemove);
    },
    queryElement(element: HTMLElement | string, parentElement: HTMLElement | Document = document): HTMLElement {
        if (typeof element === 'string') {
            element = parentElement.querySelector(element) as HTMLElement;
        }
        return element;
    },
    turnElementInvisible(element: HTMLElement | string, parentElement?: HTMLElement) {
        this.queryElement(element, parentElement).style.display = 'none';
    },
    turnElementVisible(element: HTMLElement | string, parentElement?: HTMLElement) {
        this.queryElement(element, parentElement).style.display = 'block';
    },
    copyToClipboard(val: string) {
        const element: HTMLTextAreaElement = this.createHiddenElement('textarea') as HTMLTextAreaElement;
        element.value = val;
        element.setAttribute('readonly', '');
        element.select();
        document.execCommand('copy');
        this.removeElement(element);
    },
    downloadFile(data: any, fileName: string) {
        if (!fileName) {
            fileName = 'data_' + Date.now();
        }
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const element = this.createHiddenElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', fileName);
        element.click();
        document.body.removeChild(element);
    }
};
