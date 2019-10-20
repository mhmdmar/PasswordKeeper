class DateUtils {
    constructor() {}

    getDate(): string {
        const today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1; //January is 0!
        var year = today.getFullYear();
        return DateUtils.fixDateNumber(day) + '-' + DateUtils.fixDateNumber(month) + '-' + year;
    }

    private static fixDateNumber(number: number): string {
        return number < 10 ? '0' + number : number.toString();
    }
}

export const dateUtils = new DateUtils();
