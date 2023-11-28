// NASDAQ fetch

const selectNASDAQStocksContainer = document.querySelector("#NASDAQStocks");
const selectNYSEStocksContainer = document.querySelector("#NYSEStocks");

const urlNASDAQ = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
const optionsNASDAQ = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${getCookie('APIKEY')}`,
		'X-RapidAPI-Host': `${getCookie('APIHOST')}`
	}
};

const initializeNASDAQ = async function(){
  try {
      const response = await fetch(urlNASDAQ, optionsNASDAQ);
      const result = await response.json();
      console.log(result.data);
      populateNASDAQStocks(result)
  } catch (error) {
      console.error(error);
  }
}

initializeNASDAQ()

const urlNYSE = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NYSE&format=json';
const optionsNYSE = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${getCookie('APIKEY')}`,
		'X-RapidAPI-Host': `${getCookie('APIHOST')}`
	}
};

const initializeNYSE = async function(){
  try {
      const response = await fetch(urlNYSE, optionsNYSE);
      const result = await response.json();
      console.log(result.data);
      populateNYSEStocks(result)
  } catch (error) {
      console.error(error);
  }
}

initializeNYSE()


const populateNASDAQStocks = function(dataset){
  for (const stock of dataset.data) { 
      let optionHtml = `<option value="${stock.symbol}">${stock.name}</option>`; 
      selectNASDAQStocksContainer.insertAdjacentHTML("beforeend", optionHtml);
  } 
};

const populateNYSEStocks = function(dataset){
  for (const stock of dataset.data) { 
      let optionHtml = `<option value="${stock.symbol}">${stock.name}</option>`; 
      selectNYSEStocksContainer.insertAdjacentHTML("beforeend", optionHtml);
  } 
};

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

/** 

let SYMBOL = 'AAPL';

const url2 = `https://api.twelvedata.com/time_series?symbol=${SYMBOL}&interval=1day&outputsize&apikey=${getCookie('APIKEY')}`;

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

initialize2()

*/

const url = 'https://twelve-data1.p.rapidapi.com/time_series?symbol=AMZN&interval=1day&outputsize=5000&format=json';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${getCookie('APIKEY')}`,
		'X-RapidAPI-Host': `${getCookie('APIHOST')}`
	}
};

const initializeTimeSeries = async function(){
  try {
	  const response = await fetch(url, options);
	  const result = await response.text();
	  console.log(result);
  } catch (error) {
	  console.error(error);
  }
}

initializeTimeSeries()


$(function () {
  $('.datepicker').datepicker({
    language: "es",
    autoclose: true,
    format: "dd/mm/yyyy"
  });
});
