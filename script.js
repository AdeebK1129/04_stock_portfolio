// NASDAQ fetch

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/stocks',
  params: {
    exchange: 'NASDAQ',
    format: 'json'
  },
  headers: {
    'X-RapidAPI-Key': '5a7260a38dmsh17961d8946f04d4p1eec7bjsne59a5a7977e5',
    'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}



