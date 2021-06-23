export const convertCrypto = (convertFrom, convertTo, amountOfFirstCurr) => {
    console.log(convertFrom, convertTo)

    if (convertFrom && convertTo) {
        const ratio = convertFrom.current_price / convertTo.current_price;

        console.log(ratio)

        const res = ratio * amountOfFirstCurr;

        return `${amountOfFirstCurr} ${convertFrom.name} = ${res} ${convertTo.name}`;
    }

    return "";
} 