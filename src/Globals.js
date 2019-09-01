export function getDateString(divider = '-', date = new Date()) {
    return date.toJSON().slice(0, 10).replace(/-/g, divider);
}

export function compareDates(first, second) {
    const [firstYear, firstMonth, firstDay] = [first.substring(0, 4), first.substring(4, 6), first.substring(6)];
    const [secondYear, secondMonth, secondDay] = [second.substring(0, 4), second.substring(4, 6), second.substring(6)];
    if (firstYear > secondYear) return 1;
    if (firstYear < secondYear) return -1;
    if (firstMonth > secondMonth) return 1;
    if (firstMonth < secondMonth) return -1;
    if (firstDay > secondDay) return 1;
    if (firstDay < secondDay) return -1;
    return 0;
}

export function containsDigitOnly(value) {
    return /^\d*$/.test(value);
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function isEmail(email) {
    return /(\S+)@(\S+)\.(\S+)/.test(email);
}