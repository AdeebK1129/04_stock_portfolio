checkCookie()

// const selectNASDAQStocksContainer = document.querySelector("#NASDAQStocks");
// const selectNYSEStocksContainer = document.querySelector("#NYSEStocks");

const urlNASDAQ = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';
const optionsNASDAQ = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${getCookie('APIKEY')}`,
    'X-RapidAPI-Host': `${getCookie('APIHOST')}`
  }
};

// New stock button

const newNASDAQButton = document.querySelector("#newNASDAQ")
const newNYSEButton = document.querySelector("#newNYSE")
const stockContainer = document.querySelector(".stocks")

newNASDAQButton.addEventListener("click", function () {
  const html = `
  <div class="row">
  <div class="col-sm-4 col-lg-4 mb-3">
      <div class="input-group">
          <div class="input-group-prepend">
              <label class="input-group-text" for="NASDAQStocks">NASDAQ Stocks</label>
          </div>
          <select class="custom-select nasdaqStock" id="NASDAQStocks"></select>
      </div>
  </div>

  <div class="col-sm-4 col-lg-4 mb-3">
      <div class="input-group">
          <div class="input-group-prepend">
              <label class="input-group-text" for="shares">Shares</label>
          </div>
          <input type="number" class="form-control nasdaqShares" id="shares" name="shares" min="0" step="1" value="0">
      </div>
  </div>

  <div class="col-sm-4 col-lg-4 mb-3">
    <div class="form-group">
      <form>
        <div class="form-group mb-4">
            <div class="datepicker date input-group">
                <input type="text" placeholder="Choose Date" class="form-control nasdaqDate" id="fecha1">
                <div class="input-group-append">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                </div>
            </div>
        </div>
      </form>
    </div>
  </div>
</div>
`

  $(function () {
    $('.datepicker').datepicker({
      language: "es",
      autoclose: true,
      format: "yyyy-mm-dd"
    });
  });

  stockContainer.insertAdjacentHTML("beforeend", html)
  initializeNASDAQ()
})

newNYSEButton.addEventListener("click", function () {
  const html = `
  <div class="row">
  <div class="col-sm-4 col-lg-4 mb-3">
      <div class="input-group">
          <div class="input-group-prepend">
              <label class="input-group-text" for="NYSEStocks">NYSE Stocks</label>
          </div>
          <select class="custom-select nyseStock" id="NYSEStocks"></select>
      </div>
  </div>

  <div class="col-sm-4 col-lg-4 mb-3">
      <div class="input-group">
          <div class="input-group-prepend">
              <label class="input-group-text" for="shares">Shares</label>
          </div>
          <input type="number" class="form-control nyseShares" id="shares" name="shares" min="0" step="1" value="0">
      </div>
  </div>

  <div class="col-sm-4 col-lg-4 mb-3">
    <div class="form-group">
      <form>
        <div class="form-group mb-4">
            <div class="datepicker date input-group">
                <input type="text" placeholder="Choose Date" class="form-control nyseDate" id="fecha1">

                <div class="input-group-append">
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                </div>
            </div>
        </div>
      </form>
    </div>
  </div>
</div>`

  $(function () {
    $('.datepicker').datepicker({
      language: "es",
      autoclose: true,
      format: "yyyy-mm-dd"
    });
  });

  stockContainer.insertAdjacentHTML("beforeend", html)
  initializeNYSE()
})

const initializeNASDAQ = async function () {
  try {
    const response = await fetch(urlNASDAQ, optionsNASDAQ);
    const result = await response.json();
    // console.log(result.data);
    populateNASDAQStocks(result)
  } catch (error) {
    console.error(error);
  }
}

// initializeNASDAQ()

const urlNYSE = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NYSE&format=json';
const optionsNYSE = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${getCookie('APIKEY')}`,
    'X-RapidAPI-Host': `${getCookie('APIHOST')}`
  }
};

const initializeNYSE = async function () {
  try {
    const response = await fetch(urlNYSE, optionsNYSE);
    const result = await response.json();
    console.log(result.data);
    populateNYSEStocks(result)
  } catch (error) {
    console.error(error);
  }
}

// initializeNYSE()


const populateNASDAQStocks = function (dataset) {
  const selectNASDAQStocksContainer = document.querySelectorAll("#NASDAQStocks");
  // console.log(selectNASDAQStocksContainer)
  selectNASDAQStocksContainer.forEach(function (currentValue) {
    if (currentValue.innerHTML == "") {
      for (const stock of dataset.data) {
        let optionHtml = `<option value="${stock.symbol}">${stock.name}</option>`;
        selectNASDAQStocksContainer.forEach(function (currentValue) {
          currentValue.insertAdjacentHTML("beforeend", optionHtml);
        })
        // selectNASDAQStocksContainer.insertAdjacentHTML("beforeend", optionHtml);
      }
    }
  })
};

const populateNYSEStocks = function (dataset) {
  // for (const stock of dataset.data) {
  //   let optionHtml = `<option value="${stock.symbol}">${stock.name}</option>`;
  //   selectNYSEStocksContainer.insertAdjacentHTML("beforeend", optionHtml);
  // }
  const selectNYSEStocksContainer = document.querySelectorAll("#NYSEStocks");
  // console.log(selectNASDAQStocksContainer)
  selectNYSEStocksContainer.forEach(function (currentValue) {
    if (currentValue.innerHTML == "") {
      for (const stock of dataset.data) {
        let optionHtml = `<option value="${stock.symbol}">${stock.name}</option>`;
        selectNYSEStocksContainer.forEach(function (currentValue) {
          currentValue.insertAdjacentHTML("beforeend", optionHtml);
        })
        // selectNASDAQStocksContainer.insertAdjacentHTML("beforeend", optionHtml);
      }
    }
  })
};

function setAPI() {
  document.cookie = `APIKEY=${document.querySelector("#apikey").value}`;
  document.cookie = `APIHOST=${document.querySelector("#apihost").value}`;
  console.log("Testing set");
}

// Source: W3Schools 
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
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

function checkCookie() {
  let keyCheck = getCookie("APIKEY");
  console.log(keyCheck);
  let hostCheck = getCookie("APIHOST");
  console.log(hostCheck);
  if ((hostCheck == "") || (keyCheck == "")) {
    $('#myModal').modal('show');
  }
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

*/

const url = 'https://twelve-data1.p.rapidapi.com/time_series?symbol=AMZN&interval=1day&outputsize=5000&format=json';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${getCookie('APIKEY')}`,
    'X-RapidAPI-Host': `${getCookie('APIHOST')}`
  }
};


$(function () {
  $('.datepicker').datepicker({
    language: "es",
    autoclose: true,
    format: "yyyy-mm-dd"
  });
});


let initialAmount = 0;

function setInitialAmount() {
  const initialAmountInput = document.getElementById('initialAmount');
  const enteredAmount = parseFloat(initialAmountInput.value);

  if (isNaN(enteredAmount) || enteredAmount <= 0) { //idk if she said a minimum
    alert('Please enter a valid initial cash amount.');
    return;
  }
  initialAmount = enteredAmount;
  //console.log('Initial Amount:', initialAmount);

}

// <<<<<<< HEAD
// function showPortfolioTable() {
//   const tableContent = document.createElement('table');
//   tableContent.classList.add('table');
//   const tableHeader = `
//         <thead>
//             <tr>
//                 <th>Date</th>
//                 <th>Portfolio Value</th>
//                 <th>P&L</th>
//             </tr>
//         </thead>`;

//   tableContent.innerHTML = tableHeader;
//   document.getElementById('portfolioTableContainer').innerHTML = '';
//   document.getElementById('portfolioTableContainer').appendChild(tableContent);
// }

// Get results button
const resultButton = document.querySelector("#results")
resultButton.addEventListener("click", function () {
  const nasdaqStocks = []
  const nyseStocks = []

  // retrieving each stock data
  const nasdaqNames = document.querySelectorAll(".nasdaqStock")
  const nasdaqShares = document.querySelectorAll(".nasdaqShares")
  const nasdaqDates = document.querySelectorAll(".nasdaqDate")
  nasdaqNames.forEach(function (stock, index) {
    const nasdaqStock = {
      "name": stock.value,
      "shares": nasdaqShares[index].valueAsNumber,
      "date": nasdaqDates[index].value,
    }
    nasdaqStocks.push(nasdaqStock)
  })

  const nyseNames = document.querySelectorAll(".nyseStock")
  const nyseShares = document.querySelectorAll(".nyseShares")
  const nyseDates = document.querySelectorAll(".nyseDate")
  nyseNames.forEach(function (stock, index) {
    const nyseStock = {
      "name": stock.value,
      "shares": nyseShares[index].valueAsNumber,
      "date": nyseDates[index].value,
    }
    nyseStocks.push(nyseStock)
  })

  // plugging into time series
  console.log("Nasdaq stocks: ")
  nasdaqStocks.forEach(function (value) {
    console.log(value)
  })

  console.log("Nyse stocks: ")
  nyseStocks.forEach(function (value) {
    console.log(value)
  })
})

const initializeTimeSeries = async function (stockName, numShares, dateTime) {
  const url = `https://twelve-data1.p.rapidapi.com/time_series?interval=1day&symbol=${stockName}&format=json&outputsize=5000`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${getCookie('APIKEY')}`,
      'X-RapidAPI-Host': `${getCookie('APIHOST')}`
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// initializeTimeSeries("AAPL", 20)
