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
    focusElement(element: HTMLElement | string, parentElement?: HTMLElement) {
        setTimeout(() => this.queryElement(element, parentElement).focus(), 0);
    },
    turnElementInvisible(element: HTMLElement | string, parentElement?: HTMLElement) {
        const el: HTMLElement = this.queryElement(element, parentElement);
        if (el) el.style.display = 'none';
    },
    turnElementVisible(element: HTMLElement | string, parentElement?: HTMLElement) {
        const el: HTMLElement = this.queryElement(element, parentElement);
        if (el) el.style.display = 'block';
    },
    addClass(element: HTMLElement | string, className: string, parentElement?: HTMLElement) {
        if (!className) {
            return;
        }
        if (className[0] === '.') {
            className = className.slice(1);
        }
        this.queryElement(element, parentElement).classList.add(className);
    },
    removeClass(element: HTMLElement | string, className: string, parentElement?: HTMLElement) {
        if (!className) {
            return;
        }
        if (className[0] === '.') {
            className = className.slice(1);
        }
        this.queryElement(element, parentElement).classList.remove(className);
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
