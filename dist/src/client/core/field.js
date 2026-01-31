export const parse = (field, id) => {
    if (typeof field === 'string') {
        return {
            callback: (row) => row[field],
            id: id,
            key: field,
        };
    }
    else if (typeof field === 'function') {
        return {
            callback: field,
            id: id,
            key: undefined,
        };
    }
    throw new Error(`Invalid field argument: ${String(field)}`);
};
