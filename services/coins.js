import axios from 'axios'

/**
 * Helper methods for interacting with CoinGecko API
 * 
 * Ref: https://www.coingecko.com/api/documentations/v3#/
 */

const COIN_GECKO_URL = `https://api.coingecko.com/api/v3/`;

/**
 * Pull info about all coins from CoinGecko, sorted by market cap
 * API Route: /coins/markets
 * @param {number} number_per_page - number of items
 * @returns {object} JSON details about coins
 */
export const getDashboardInfo = async(number_per_page) => {
    const res = await axios.get(`${COIN_GECKO_URL}/coins/markets`, {
        params: {
            vs_currency: "cad",
            order: "market_cap_desc",
            per_page: number_per_page,
            page: 1,
            sparkline: false
        }
    });

    return res.data;
}

/**
 * Pull info about a specific coin from CoinGecko
 * @param {string} id - CoinGecko ID fro coin
 * @returns {object} JSON details about coin
 */
export const getCoinInfo = async(id) => {
    const res = await axios.get(`${COIN_GECKO_URL}/coins/${id}`, {
        params: { params: { 
            id: id
            // market_data: true,  
        }}
    });

    return res.data;
}
