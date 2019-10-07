export const DOMHelper = {
    customSelector(selector: string, value: string): string {
        return '['.concat(selector, '="', value, '"]');
    },
    testIdSelector(testID: string) {
        return this.customSelector('test-id', testID);
    }
};
