// NASDAQ fetch

const selectNASDAQStocksContainer = document.querySelector("#NASDAQStocks");
const selectNYSEStocksContainer = document.querySelector("#NYSEStocks");

const urlNASDAQ = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
const optionsNASDAQ = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5a7260a38dmsh17961d8946f04d4p1eec7bjsne59a5a7977e5',
		'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
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
		'X-RapidAPI-Key': '5a7260a38dmsh17961d8946f04d4p1eec7bjsne59a5a7977e5',
		'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
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
      let optionHtml = `<option value="${stock.symbol}">${stock.symbol}</option>`; 
      selectNASDAQStocksContainer.insertAdjacentHTML("beforeend", optionHtml);
  } 
};

const populateNYSEStocks = function(dataset){
  for (const stock of dataset.data) { 
      let optionHtml = `<option value="${stock.symbol}">${stock.symbol}</option>`; 
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

let initialAmount = 0; 

function setInitialAmount() {
    const initialAmountInput = document.getElementById('initialAmount');
    const enteredAmount = parseFloat(initialAmountInput.value);

    if (isNaN(enteredAmount) || enteredAmount <= 0) { //idk if she said a minimum
        alert('Please enter a valid initial cash amount.');
        return;
    }
    initialAmount = enteredAmount;
    //console.log('Initial Amoun:', initialAmount);

}

//initialize2()




