const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const generalUtils = {
    generatePassword(length = 12): string {
        return Array.apply(null, Array(length || 10))
            .map(function() {
                return charSet.charAt(Math.random() * charSet.length);
            })
            .join('');
    },
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
};
