/**
 * Вычисляет конвертированную сумму на основе заданных курсов и исходной суммы.
 * @param fromPrice Курс валюты, из которой происходит конвертация.
 * @param toPrice Курс валюты, в которую происходит конвертация.
 * @param sum Исходная сумма для конвертации.
 * @returns Конвертированная сумма.
 */
export function getAmountConverted(fromPrice: number, toPrice: number, sum: number): number {
    return fromPrice / toPrice * sum;
}

/**
 * Округляет число до заданного количества знаков после запятой.
 * @param value Число, которое нужно округлить.
 * @param num Количество знаков после запятой (по умолчанию 0).
 * @returns Округленное число.
 */
export function getFixedNumber(value: number, num: number = 0): number {
    const factor: number = Math.pow(10, num);
    return Math.round(value * factor) / factor;
}

/**
 * Извлекает положительно десятичное число из строки, удаляя все лишние символы.
 * @param str Входная строка, содержащая числовое значение.
 * @returns Строка, представляющая десятичное число.
 */
export function getDecimalNumberFromString(str: string): string {
    // caniuse - Safari mac/ios 16.4+
    // str.replace(/[^0-9e.]|(?<=\..*)\.|(?<=e.*)e/g, '')

    let result = '';
    const map = {
        '.': false,
        'e': false
    };
    for (const char of str) {
        if (map[char] === false) {
            map[char] = true;
            result += char;
        } else if (char >= '0' && char <= '9') {
            result += char;
        }
    }
    return result;
}