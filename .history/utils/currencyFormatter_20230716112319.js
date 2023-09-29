// format currency in Pakistani rupees
import "intl";

import "intl/locale-data/jsonp/en"

export const formatCurrencyPKR = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 2,
    })
        .format(value)
        .replace('PKR', 'Rs.');
};