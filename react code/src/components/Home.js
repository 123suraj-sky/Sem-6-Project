// "rafce" shortcut is used
import React, { useState, useEffect } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed'; // for showing twitter feeds
import './css/Home.css';



// api related stuff
const apiKey = "41FfB7uFOaXpSw2S8GzsrA==B1V8qCwAg08fRT28";

const options = {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKey,
    }
}

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=10"


let news = []; // storing news items

// function to get news from api
async function GetNews() {
    try {

        const response = await fetch(apiURL, options);
        // converting response to json
        const data = await response.json();

        console.log(data);
        // console.log(data.results);
        // console.log(data.results[0].title);

        for (let index = 0; index < 10; index++) {
            // console.log(data.results[index].title);

            // create paragraph element and add data to it
            const pElement = document.createElement('li');
            //! pElement.innerHTML = data.results[index].title;
            pElement.innerHTML = data[index].joke;
            console.log(pElement)
            news.push(pElement);
        }
    } catch (error) {
        console.log(error);
    }
}

// calling function to load news from api
GetNews()

//* main page content
const Home = () => {
    // const Home = (props) => {

    // waiting for 3 seconds to load news from news api
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShouldRender(true);
        }, 3000); // wait for 3 seconds

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className='body'>
            {/* <Notes showAlert={showAlert} /> */}

            {/* title here */}
            <div className="d-flex justify-content-center h1 mb-5 title">
                Title Here
            </div>

            {/* differenet logos */}
            <div className="container d-flex justify-content-around mt-3 mb-5 logos">
                <div className="bodyLogo">
                    logo
                </div>
                <div className="bodyLogo">
                    logo
                </div>
                <div className="bodyLogo">
                    logo
                </div>
                <div className="bodyLogo">
                    logo
                </div>
                <div className="bodyLogo">
                    logo
                </div>
            </div>

            {/* body section after title */}
            <div className="container d-flex justify-content-between body_section">
                {/* agriculture news */}
                <div className="agriNews rounded">
                    <p className='fs-4 fw-bolder latestNews p-3 border-bottom'>Latest Agriculture News</p>
                    <ul className="news-list ms-2">
                        {shouldRender && (
                            news.map((item, index) => {
                                return (
                                    <li key={index}>{item.innerHTML}</li>
                                )
                            })
                        )}
                    </ul>
                </div>

                <div className="menu">
                    <ul>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                        <li>lorem</li>
                    </ul>
                </div>

                <div className="twitter">
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="AgriGoI"
                        options={{ height: 400, width: 400 }}
                    />
                </div>
            </div>

            {/* footer */}
            
        </div>
    )
}

export default Home

/*
 Above can also be wriiten as
 
 export const Home = () => {
    ...

 }

 instead of 

const Home = () => {
    ...
}
export default Home
 */