// format currency in Pakistani rupees
export const formatCurrencyPKR = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 2,
    })
        .format(value)
        .replace('PKR', 'Rs.');
};