// ===============================
// JavaScript: Crypto Chart App
// ===============================
// STEP 1: Create an Axios instance with a base URL
// This helps us avoid repeating the full URL each time
// STEP 2: Define the coins we want to track
// We’ll fetch data for each of these coins
// STEP 3: Function to create a chart using Chart.js
// - Takes Chart, coinId, labels, data, and symbol
// - Creates a <canvas> element dynamically
// - Uses Chart.js to draw the graph
// STEP 4: Function to fetch and display charts
// - Shows loader while data is loading
// - Uses Promise.all to fetch prices for all coins at once
// - Maps data to time labels and prices
// STEP 5: Create a chart for each coin
// STEP 6: Run the charts and refresh every 10 seconds

const api = axios.create({
  baseURL: "https://coinbase.com/api/v2/assets/prices",
});

const coins = ["/bitcoin", "/ethereum"];


function formatUNIXTime(timestamp) {
    const dateTime = new Date(timestamp * 1000);
    return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
}
async function fetchCoins() {
  try {
    const results = await Promise.all(coins.map(url => api.get(url)));
    return results.map(res => res.data.data);
  }
  catch(error){
    console.error("Error fetching data : ", error);
    return [];
  }
}

function cleanChartSection(){
  const chartSection = document.getElementById("chartSection");
  chartSection.innerHTML = '';

}
function createChart(Chart, coinId, labels, data, symbol) {
  const chartSection = document.getElementById("chartSection");
  const canvas = document.createElement("canvas");
  canvas.id = coinId;
  chartSection.appendChild(canvas);

  new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `${symbol}, Amount`,
          data: data,
          borderColor: 'rgba(148, 88, 174, 0.8)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 2,
          fill: true,
        },
      ],},
    options: { 
      plugins: {
        title: {
          display: true,
          text: `${coinId} 24 Hour Price Chart`,
          padding: {
            top: 10,
            bottom: 30
          }
        },
        legend: { 
          display: true
        }
      },
      responsive: true },
    }
  );  
}

async function run() {
  cleanChartSection();
  const coinData = await fetchCoins();
  coinData.forEach(coin => {
    const pricesList = coin.prices.day.prices
    const last24hrsPriceList = pricesList.slice(0,288).filter((price,index) => index % 4 === 0); //every 20 min for the last 24hrs 
    console.log(last24hrsPriceList);
    const labels = last24hrsPriceList.map(price => formatUNIXTime(price[1])).reverse();
    const data = last24hrsPriceList.map(price => parseFloat(price[0]).toFixed(2)).reverse();
    const coinId = coin.base;
    const symbol = coin.currency
    createChart(Chart, coinId, labels, data, symbol);
  })
  
}

run();
setInterval(run, 10000);