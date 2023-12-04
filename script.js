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
    // // console.log(result.data);
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

// dictionary containing datetime as a key, and portfolio value as a value
const days = {}

// method to update days
function updateDays(closeValue,datetime,shares) {
  if(datetime in days) {
    // console.log("bruh")
    const currentValue = days[datetime]
    const newValue = currentValue + (closeValue * shares)
    days[datetime] = newValue
  }
  else {
    const newValue = closeValue * shares
    days[datetime] = newValue
  }
}

// time series
const initializeTimeSeries = async function (stockName, numShares, dateTime) {
  const url = `https://twelve-data1.p.rapidapi.com/time_series?interval=1day&symbol=${stockName}&format=json&outputsize=5000`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${getCookie('APIKEY')}`,
      'X-RapidAPI-Host': `${getCookie('APIHOST')}`
    }
  };
  try{
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result["values"]);    
    const stockInfoArray = result["values"]
    for(i=0;i<stockInfoArray.length;i++) {
      if(stockInfoArray[i].datetime < dateTime) {
        break
      }
      else {
        const closeValue = stockInfoArray[i].close
        const currentDate = stockInfoArray[i].datetime
        updateDays(closeValue,currentDate,numShares)
      }
    }
  } catch(error) {
    console.log(error)
  }
}

// Get results button
const resultButton = document.querySelector("#results")
resultButton.addEventListener("click", loadResults)

async function loadResults() {
  const nasdaqStocks = []
  const nyseStocks = []

  // retrieving each stock data
  const nasdaqNames = document.querySelectorAll(".nasdaqStock")
  const nasdaqShares = document.querySelectorAll(".nasdaqShares")
  const nasdaqDates = document.querySelectorAll(".nasdaqDate")
  nasdaqNames.forEach(function (stock, index) {
    const nasdaqStock = {
      name: stock.value,
      shares: nasdaqShares[index].valueAsNumber,
      date: nasdaqDates[index].value,
    }
    nasdaqStocks.push(nasdaqStock)
  })

  const nyseNames = document.querySelectorAll(".nyseStock")
  const nyseShares = document.querySelectorAll(".nyseShares")
  const nyseDates = document.querySelectorAll(".nyseDate")
  nyseNames.forEach(function (stock, index) {
    const nyseStock = {
      name: stock.value,
      shares: nyseShares[index].valueAsNumber,
      date: nyseDates[index].value,
    }
    nyseStocks.push(nyseStock)
  })

  // plugging into time series

  const allStocks = nasdaqStocks.concat(nyseStocks)
  // console.log(allStocks)
  for(value of allStocks) {
    const stockName = value.name
    const stockShares = value.shares
    const stockDate = value.date
    await initializeTimeSeries(stockName, stockShares, stockDate)
    // console.log("Finished " + stockName)
  }

  // console.log(days)
  makeTable(Object.entries(days))
}
function makeTable(tableArray) {
  const tableContent = document.createElement('table');
  tableContent.classList.add('table');
  const tableHeader = `
        <thead>
            <tr>
                <th>Date</th>
                <th>Portfolio Value</th>
                <th>P&L</th>
            </tr>
        </thead>`;

  tableContent.innerHTML = tableHeader;

  // Sort the tableArray based on dates
  tableArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));

  let initialPortfolioValue = tableArray.length > 0 ? tableArray[0][1] : initialAmount;
  let cumulativePortfolioValue = initialPortfolioValue;

  for (let i = 0; i < tableArray.length; i++) {
    const currentDate = tableArray[i][0];
    const currentPortfolioValue = tableArray[i][1];
    const pnl = currentPortfolioValue - cumulativePortfolioValue;
    const actualpnl = currentPortfolioValue - initialPortfolioValue 
    cumulativePortfolioValue += pnl; // Update cumulative portfolio value

    const displayedPortfolioValue = (cumulativePortfolioValue + initialAmount).toFixed(2);

    const tableRow = `
      <tr>
        <td>${currentDate}</td>
        <td>${displayedPortfolioValue}</td>
        <td>${actualpnl.toFixed(2)}</td>
      </tr>`;
    tableContent.innerHTML += tableRow;
  }

  document.getElementById('portfolioTableContainer').innerHTML = '';
  document.getElementById('portfolioTableContainer').appendChild(tableContent);
}
// initializeTimeSeries("AAPL", 20)
