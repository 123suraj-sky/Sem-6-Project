// we are using api called as "api ninjas" to get the jokes
// login to the website and to get the api key
// click on show api key to get your api key
const btnElement = document.getElementById('btn');
const jokeElement = document.getElementById('joke');
const divElement = document.getElementById('joke1');

const apiKey = "lgD75iqNH1mVDnZmKNfDt1p_tsjBxDUwpxuf47NnTv4";

const options = {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKey,
    }
}

const apiURL = "https://api.newscatcherapi.com/v2/search?q=agriculture&lang=en&sort_by=relevancy&page=1"


async function getJoke() {
    try {
        jokeElement.innerHTML = `<img src="loader.gif" alt="Loading...">`;
        btnElement.disabled = true;
        btnElement.innerHTML = "Loading...";

        const response = await fetch(apiURL, options);
        // converting response to json
        const data = await response.json();

        // console.log(data);
        // console.log(data.articles);
        
        for (let index = 0; index < 50; index++) {
            console.log(data.articles[index].title);

            // create paragraph element and add data to it
            const pElement = document.createElement('li');
            pElement.innerHTML = data.articles[index].title;

            // append pElement to jokeElement
            divElement.appendChild(pElement);
        }

        

        jokeElement.innerHTML = "";
        btnElement.disabled = false;
        btnElement.innerHTML = "Get Joke";
    } catch (error) {
        console.log(error);
        jokeElement.innerHTML = `Something went wrong... Try again later!!! <br> ${error}`;
        btnElement.disabled = false;
        btnElement.innerHTML = "Get Joke";
    }
}

btnElement.addEventListener('click', getJoke);