import { isNull, isObject, isObjectArray } from './value';
import { check } from './check';
export const match = (entry, value, params) => {
    params.check = params.check ?? check.isLike;
    if (isNull(value)) {
        return true;
    }
    else if (isObjectArray(entry)) {
        // if (isObject(entry) && entry.is_map === true) return true
        return Object.keys(entry).some(k => match(entry[k], value, params));
    }
    return params.check(entry, value);
};
export const sift = (entry, value, params) => {
    if (Array.isArray(entry)) {
        entry = entry.filter((item) => {
            // to disable deletion while filtering, check is worth true anyway
            const check = params.isRecursive === true ? match(item, value, params) : true;
            if (typeof item === 'object' && check === true) {
                for (const k of Object.keys(item)) {
                    item[k] = sift(item[k], value, params);
                }
            }
            return check;
        });
    }
    if (params.highlight && (typeof entry === 'string' || typeof entry === 'number') && typeof value === 'string' && match(entry, value, params)) {
        return emphasize(entry, value);
    }
    return entry;
};
const emphasize = (entry, value) => {
    const search = value
        .replace(/a/g, '[aàâáä]')
        .replace(/e/g, '[eèêéë]')
        .replace(/i/g, '[iìîíï]')
        .replace(/o/g, '[oòôо́ö]')
        .replace(/u/g, '[uùûúü]')
        .replace(/y/g, '[yỳŷýÿ]');
    const exp = new RegExp(`${search}`, 'gi');
    return String(entry).replace(exp, `<u class="highlight">$&</u>`);
};
export const deepEmphasize = (entry, value, callback) => {
    const path = callback.toString()
        .split('=>')[1]
        .replace(/\(\)/g, '')
        .replace(/\?/g, '')
        .split('.').splice(1).join('.')
        .trim();
    if (path.indexOf(' ') > -1)
        return entry;
    return deepSet(entry, path, value);
};
const deepSet = (entry, path, value) => {
    const initial = entry;
    const keys = path.replace(/\[/g, '.[').split(".");
    try {
        for (let i = 0; i < keys.length; i++) {
            let current = keys[i];
            let next = keys[i + 1];
            if (current.includes('[')) {
                current = String(parseInt(current.substring(1, current.length - 1)));
            }
            if (next && next.includes('[')) {
                next = String(parseInt(next.substring(1, next.length - 1)));
            }
            if (next !== undefined) {
                entry[current] = entry[current] ? entry[current] : (isNaN(Number(next)) ? {} : []);
            }
            else {
                entry[current] = emphasize(entry[current], value);
            }
            entry = entry[current];
        }
        return initial;
    }
    catch (_) {
        return initial;
    }
};
