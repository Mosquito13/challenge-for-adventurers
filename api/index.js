const axios = require('axios');

const config = require('../config');

const API_URL = 'https://challenge-for-adventurers.herokuapp.com';

const fetchByType = async (type) => {
    const url = `${API_URL}/data/${config.apiKey}/${type}`;
    const res = await axios.get(url);
   
    return res.data;
};

const fetchAll = async () => {
    const prices = await fetchByType('prices');
    const spents = await fetchByType('spents');
    const supplies = await fetchByType('supplies');

    return {
        prices,
        spents,
        supplies
    };
};

const sendResults = async results => axios.post(`${API_URL}/check?id=${config.apiKey}`, results);

module.exports = {
    fetchAll,
    sendResults
};