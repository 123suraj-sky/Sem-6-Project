// we are using api called as "api ninjas" to get the jokes
// login to the website and to get the api key
// click on show api key to get your api key
const btnElement = document.getElementById('btn');
const jokeElement = document.getElementById('joke');
const divElement = document.getElementById('joke1');

const apiKey = "pub_21307a16a1da3e7625c4a9d5324f5b70d7710";

const options = {
    method: 'GET',
    // headers: {
    //     'X-Api-Key': apiKey,
    // }
}

const apiURL = "https://newsdata.io/api/1/news?apikey=pub_21307a16a1da3e7625c4a9d5324f5b70d7710&q=agriculture&country=in&language=en"


async function getJoke() {
    try {
        jokeElement.innerHTML = `<img src="loader.gif" alt="Loading...">`;
        btnElement.disabled = true;
        btnElement.innerHTML = "Loading...";

        const response = await fetch(apiURL, options);
        // converting response to json
        const data = await response.json();

        console.log(data);
        // console.log(data.results);
        // console.log(data.results[0].title);
        // console.log(data.results[1].title);
        
        for (let index = 0; index < 10; index++) {
            // console.log(data.results[index].title);

            // create paragraph element and add data to it
            const pElement = document.createElement('p');
            pElement.innerHTML = data.results[index].title;

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