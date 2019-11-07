const _ = require('lodash');
const moment = require('moment');
const Decimal = require('decimal.js');

const config = require('../config');

const parseDateToMoment = date => moment(date, config.dateFormat);

const isSameDate = (firstDate, secondDate) => {
    firstDate = moment.isMoment(firstDate) ? firstDate.format(config.dateFormat) : firstDate;
    secondDate = moment.isMoment(secondDate) ? secondDate.format(config.dateFormat) : secondDate;

    return parseDateToMoment(firstDate).isSame(parseDateToMoment(secondDate));
};

const findValueByDate = (collection, momentDate) => {
    const itemFound = _.find(collection, item => isSameDate(item.date, momentDate));

    return itemFound ? new Decimal(itemFound.value) : undefined;
};

const minDate = (...dates) => {
    const momentDates = [];

    dates.forEach(d => momentDates.push(parseDateToMoment(d)));

    return moment.min(momentDates);
};

const maxDate = (...dates) => {
    const momentDates = [];

    dates.forEach(d => momentDates.push(parseDateToMoment(d)));

    return moment.max(momentDates);
};

module.exports = {
    parseDateToMoment,
    isSameDate,
    findValueByDate,
    minDate,
    maxDate
};