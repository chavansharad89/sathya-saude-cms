export const required = value => {
    return value ? undefined : 'This field is required.'
};

export const rejection = value => {
    return value ? undefined : 'Rejection reason should be mentioned.'
};
export const email = value => value && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value.trim()) ? undefined: 'Please enter a valid email address';
export const minLength6 = minLength(6);
export const minLength2 = minLength(2);
export const minLength10 = minLength(10);
export const maxLength = (maxValue) => {
    return (value) => {
        if(value > maxValue) {
            return `Value provided should be maximum ${maxValue}`;
        }
        return undefined;
    };
};

export const lessThan = (value1) => {
    return (value2) => {
        return value1 > value2 ? undefined: 'Invalid value'
    }; 
};

function minLength(min = 6) {
    return value => value && value.length < min ? `Value should be atleast ${min} long` : undefined;

}