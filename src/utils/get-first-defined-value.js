import isNullOrUndefined from './is-null-or-undefined';

const getFirstDefinedValue = (...values) => {
    let firstDefinedValue;

    values.some((value) => {
        if (!isNullOrUndefined(value)) {
            firstDefinedValue = value;
            return true;
        }

        return false;
    });

    return firstDefinedValue;
}

export default getFirstDefinedValue;