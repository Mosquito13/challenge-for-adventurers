const moment = require('moment');
const Decimal = require('decimal.js');

const utils = require('../utils');
const config = require('../config');
const api = require('../api');

module.exports = async (req, res) => {
    const { prices, spents, supplies } = await api.fetchAll();

    const AUTONOMY = 9;
    const START_DATE = utils.minDate(prices[0].date, spents[0].date, supplies[0].date);
    const END_DATE = utils.maxDate(prices[prices.length - 1].date, spents[spents.length - 1].date, supplies[supplies.length - 1].date);

    let currentDate = moment(START_DATE);

    let currentBalance = new Decimal(0);
    let activePrice = new Decimal(0);

    let response = [];

    while (!utils.isSameDate(currentDate, END_DATE)) {
        const currentDatePrice = utils.findValueByDate(prices, currentDate);
        const currentDateSpent = utils.findValueByDate(spents, currentDate);
        const currentDateSupply = utils.findValueByDate(supplies, currentDate);

        activePrice = currentDatePrice || activePrice;

        if (currentDateSupply) {
            currentBalance = currentBalance.plus(currentDateSupply.dividedBy(activePrice).toDecimalPlaces(2));
        }

        if (currentDateSpent) {
            currentBalance = ((currentBalance.times(AUTONOMY)).sub(currentDateSpent)).dividedBy(AUTONOMY).toDecimalPlaces(2);
        }

        response.push({
            date: currentDate.format(config.dateFormat),
            value: parseFloat(currentBalance.toString())
        });

        currentDate.add(1, 'days');
    }

    api.sendResults(response);

    res.send(response);
};