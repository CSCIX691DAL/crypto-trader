/**
 * Helper method for working with conversion page
 */

/**
 * Convert between two currencies
 * @param {string} convertFrom - source currency
 * @param {string} convertTo - destination currency
 * @param {number} amountOfFirstCurr - amount of source to convert
 * @returns {string} conversion text (X coin1 = Y coin2)
 */
export const convertCrypto = (convertFrom, convertTo, amountOfFirstCurr) => {
    if (convertFrom && convertTo) {
        const ratio = convertFrom.current_price / convertTo.current_price;
        const res = ratio * amountOfFirstCurr;

        return `${amountOfFirstCurr} ${convertFrom.name} = ${res} ${convertTo.name}`;
    }

    return "";
} 