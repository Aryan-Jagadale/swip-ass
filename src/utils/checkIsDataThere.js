export function isInvoiceValid(invoice) {
    const requiredFields = [
        'billTo',
        'billToEmail',
        'billToAddress',
        'billFrom',
        'billFromEmail',
        'billFromAddress'
    ];

    for (const field of requiredFields) {
        if (!invoice[field] || invoice[field].trim() === '') {
            return false;
        }
    }
    for (const item of invoice.items) {
        if (!item.itemName) {
            return false;
        }
    }

    return true;
}
