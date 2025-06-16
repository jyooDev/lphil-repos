// STEP 1: Add DOMContentLoaded event listener to wait for HTML load
document.addEventListener('DOMContentLoaded', () => {
    // STEP 2: Select button and advice container using document.getElementById()
    const getAdviceBtn = document.getElementById('getAdviceBtn');
    const adviceContainer = document.getElementById('advice');

    // STEP 8: Add event listener to button to fetch new advice on each click
    getAdviceBtn.addEventListener('click', fetchAdvice)

    // STEP 9: Fetch initial advice immediately when page loads
    fetchAdvice();
    // STEP 3: Define async function to fetch random advice from Advice Slip API
    async function fetchAdvice(){
        const apiEndpoint = 'https://api.adviceslip.com/advice';
        try{
            // STEP 4: Fetch advice from https://api.adviceslip.com/advice
            // STEP 5: Await response and convert it to JSON
            const response = await fetch(apiEndpoint);
            const data = await response.json();
            // STEP 6: Display advice text clearly on the webpage
            adviceContainer.textContent = `${data.slip.advice}`;
        }catch(e){
            // STEP 7: Handle errors gracefully by displaying an error message
            console.error(`Error fetching data: ${e}`);
        }
    }
})

