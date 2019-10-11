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
    }
};
