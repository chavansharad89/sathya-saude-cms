const shortMonthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const longMonthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const months = {
    "JAN": "January",
    "FEB": "February",
    "MAR": "March",
    "APR": "April",
    "MAY": "May",
    "JUN": "June",
    "JUL": "July",
    "AUG": "August",
    "SEP": "September",
    "OCT": "October",
    "NOV": "November",
    "DEC": "December"
};

export function convertDate(date, format = [], joinDateWith = ' ') {
    date = parseDateFromServerDate(date);
    if (date && format.length > 0) {
        return _formattedDate(date, format, joinDateWith);
    }
    return date;
}

export function compareDates(startDate, endDate) {
    if (startDate && endDate) {
        startDate = new Date(startDate).setHours(0, 0, 0, 0);
        endDate = new Date(endDate).setHours(0, 0, 0, 0);
        return new Date(startDate).getTime() < new Date(endDate).getTime();
    } else {
        return false;
    }
}

export function resetTime(date = new Date()) {
    return new Date(date).setHours(0, 0, 0, 0);
}

export function convertToISO(date = new Date()) {
    return new Date(date).toISOString();
}

export function parseDateToServerDate(date, hour = 0, minute = 0) {
    const { year, month, day } = _getDateObject(date);
    const _date = new Date(Date.UTC(year, month, day, hour, minute, 0)).toISOString();
    return _date;
}

export function getDateDetails(date = new Date()) {
    return _getDateObject(date);
}

function parseDateFromServerDate(date) {
    if (date) {
        let utcdate = new Date(date);
        let timeOffset = utcdate.getTimezoneOffset() * 60 * 1000;
        let time = utcdate.getTime() + timeOffset;
        utcdate = new Date(time);
        return utcdate;
    }
    return '';
}

/************************************************************************Private Methods******************************* */
function _getDateObject(date = new Date()) {
    date = parseDateFromServerDate(date);
    return {
        year: date.getFullYear(),
        month: (date.getMonth()),
        day: date.getDate()
    };
}

function _formattedDate(date, format, joinDateWith) {
    return format.reduce((_date, value) => {
        const dateDetails = _getDateDetails(date, value);
        _date.push(dateDetails);
        return _date;
    }, []).join(joinDateWith);
}

function _getDateDetails(date = new Date(), format) {
    switch (format) {
        case 'MM':
            return shortMonthsName[date.getMonth()];
        case 'mm':
            const _month = date.getMonth() + 1;
            return _month < 10 ? `0${_month}` : _month;
        case 'DD':
        case 'dd':
            const _date = date.getDate();
            return _date < 10 ? `0${_date}` : _date;
        case 'YY':
        case 'yy':
            return date.getFullYear().toString().substr(-2);
        case 'MMMM':
        case 'mmmm':
            return longMonthsName[date.getMonth()];
        case 'MMM':
        case 'mmm':
            return shortMonthsName[date.getMonth()] 
        case 'YYYY':
        case 'yyyy':
            return date.getFullYear();
        default:
            return '';
    }
}