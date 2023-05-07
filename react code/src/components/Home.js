// "rafce" shortcut is used
import React, { useState, useEffect } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed'; // for showing twitter feeds
import './css/Home.css';

// logos
import logo1 from './logo/jal-shakti-abhiyan-sanchay-jal-behtar-kal.png'
import logo2 from './logo/AWG-g20.jpg'
import logo3 from './logo/azadi-ka-amrit-mahotsav.png'
import logo4 from './logo/logo_G20.png'
import logo5 from './logo/swachh-bharat-swachh-vidyalaya.png'



// api related stuff
// const apiKey = "41FfB7uFOaXpSw2S8GzsrA==B1V8qCwAg08fRT28";
// const apiKey = "pub_21307a16a1da3e7625c4a9d5324f5b70d7710";

const options = {
    method: 'GET',
    // headers: {
    //     'X-Api-Key': apiKey,
    // }
}

// const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=10"
const apiURL = "https://newsdata.io/api/1/news?apikey=pub_21307a16a1da3e7625c4a9d5324f5b70d7710&q=agriculture&country=in&language=en"


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
            pElement.innerHTML = data.results[index].title;
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
            {/* title here */}
            <div className="d-flex justify-content-center h1 mb-5 title">
                Agro Solutions
            </div>

            {/* differenet logos */}
            <div className="container d-flex justify-content-around mt-3 mb-5 logos">
                <div className="bodyLogo">
                    <a href="https://ejalshakti.gov.in/jsa/JSA_Login.aspx?aspxerrorpath=/JSA/JSA/Home.aspx"><img className='rounded' src={logo1} alt="logo1" /></a>
                </div>
                <div className="bodyLogo">
                    <a href="http://agriwelfare.gov.in//awg-g20/"><img className='rounded' src={logo2} alt="logo2" /></a>
                </div>
                <div className="bodyLogo">
                    <a href="https://amritmahotsav.nic.in/"><img className='rounded' src={logo3} alt="logo3" /></a>
                </div>
                <div className="bodyLogo">
                    <a href="https://www.g20.org/en/"><img className='rounded' src={logo4} alt="logo4" /></a>
                </div>
                <div className="bodyLogo">
                    <a href="https://swachhbharat.mygov.in/"><img className='rounded' src={logo5} alt="logo5" /></a>
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

                <div className="twitter">
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="upagriculture"
                        options={{ height: 800, width: 400 }}
                    />
                </div>

                <div className="twitter">
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="AgriGoI"
                        options={{ height: 800, width: 400 }}
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