import axios from 'axios'

const COIN_GECKO_URL = `https://api.coingecko.com/api/v3/`;

export const getDashboardInfo = async() => {
    const res = await axios.get(`${COIN_GECKO_URL}/coins/markets`, {
        params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false
        }
    });

    return res.data;
}