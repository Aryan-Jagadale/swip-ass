import axios from 'axios';

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_BcyGKAagBfGM9NSNzzIn52ilqoXfumiDllCdLi7P`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};