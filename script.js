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

//initialize()

function setAPI(){
  document.cookie = `APIKEY=${document.querySelector("#apikey").value}`;
  document.cookie = `APIHOST=${document.querySelector("#apihost").value}`;
  console.log("Testing set");
} 

// Source: W3Schools 
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

document.querySelector("#form").addEventListener("submit", setAPI);

let SYMBOL = 'AAPL';

const url2 = `https://api.twelvedata.com/time_series?symbol=${SYMBOL}&interval=1min&apikey=${getCookie('APIKEY')}`;

const initialize2 = async function(){
  try {
      const response = await fetch(url2);
      const result = await response.json();
      console.log(result); 
      console.log('Testing fetch');
  } catch (error) {
      console.error(error);
  }
};

//initialize2()




