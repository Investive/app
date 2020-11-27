const idToLabel = (id) => {
    if (id === 'sell_quantity') {
        return 'sold';
    } else if (id === 'buy_quantity') {
        return 'bought';
    } else if (id === 'posted') {
        return 'Completed';
    } else if (id.includes('tfsa')) {
        return 'TFSA';
    } else if (id.includes('rrsp')) {
        return 'RRSP';
    } else if (id.includes('crypto')) {
        return 'Crypto';
    } else if (id.includes('non_registered')) {
        return 'Non-Registered';
    }
}

export default idToLabel;