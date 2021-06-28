export const convertCrypto = (convertFrom, convertTo, amountOfFirstCurr) => {
    if (convertFrom && convertTo) {
        const ratio = convertFrom.current_price / convertTo.current_price;
        const res = ratio * amountOfFirstCurr;

        return `${amountOfFirstCurr} ${convertFrom.name} = ${res} ${convertTo.name}`;
    }

    return "";
} 