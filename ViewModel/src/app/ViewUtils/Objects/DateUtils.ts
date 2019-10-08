class DateUtils {
    constructor() {}

    getDate(): string {
        const date = new Date();
        return DateUtils.fixDateNumber(date.getDay()) + '-' + DateUtils.fixDateNumber(date.getMonth()) + '-' + DateUtils.fixDateNumber(date.getFullYear());
    }

    private static fixDateNumber(number: number): string {
        return number < 10 ? '0' + number : number.toString();
    }
}

export const dateUtils = new DateUtils();
