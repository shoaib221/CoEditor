
export function formatNumber(num) {
    if (num === null || num === undefined) return '';

    // Handle negative numbers
    const sign = num < 0 ? '-' : '';
    num = Math.abs(num);

    if (num >= 1_000_000_000) {
        return sign + (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (num >= 1_000_000) {
        return sign + (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1_000) {
        return sign + (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return sign + num.toString();
    }
}
