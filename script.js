// NASDAQ fetch

const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5a7260a38dmsh17961d8946f04d4p1eec7bjsne59a5a7977e5',
		'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
	}
};

const initialize = async function(){
  try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data[0]);
  } catch (error) {
      console.error(error);
  }
}

initialize()

let SYMBOL = 'TSLA';
let APIKEY = 'test';

const url2 = `https://api.twelvedata.com/time_series?symbol=${SYMBOL}&interval=1min&apikey=${APIKEY}`
fetch(url2)
.then(response => response.json())
    .then(data => {
        console.log(data[0])
      })
    .catch(err => console.log(err));


