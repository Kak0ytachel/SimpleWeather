import {useEffect, useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Icon from './Icon.jsx'
import DataElement from "./DataElement.jsx";
import DataCard from "./DataCard.jsx";
import HourlyElement from "./HourlyElement.jsx";
import HourlyCard from "./HourlyCard.jsx";
import CityElement from "./CityElement.jsx";
import CityCard from "./CityCard.jsx";
import DailyElement from "./DailyElement.jsx";
import DailyCard from "./DailyCard.jsx";
import Divider, {VerticalDivider} from "./Divider.jsx";
import MainCard from "./MainCard.jsx";
import {getWeather, search} from "./weatherAPI.js"

function App() {
  // const [count, setCount] = useState(0)


    // <>
    //   <section id="center">
    //     <div className="hero">
    //       <img src={heroImg} className="base" width="170" height="179" alt="" />
    //       <img src={reactLogo} className="framework" alt="React logo" />
    //       <img src={viteLogo} className="vite" alt="Vite logo" />
    //
    //         <Icon name="na"/>
    //         {/*<DataElement icon="rain" title={"Rain\nchance"} value="10%"/>*/}
    //
    //         <DataCard/>
    //         <HourlyCard/>
    //         <CityCard/>
    //         <DailyCard/>
    //       <Divider/>
    //     </div>
    //     <div>
    //       <h1>Get started</h1>
    //       <p>
    //         Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
    //       </p>
    //     </div>
    //     <button
    //       className="counter"
    //       onClick={() => setCount((count) => count + 1)}
    //     >
    //       Count is {count}
    //     </button>
    //   </section>
    //
    //   <div className="ticks"></div>
    //
    //   <section id="next-steps">
    //     <div id="docs">
    //       <svg className="icon" role="presentation" aria-hidden="true">
    //         <use href="/icons.svg#documentation-icon"></use>
    //       </svg>
    //       <h2>Documentation</h2>
    //       <p>Your questions, answered</p>
    //       <ul>
    //         <li>
    //           <a href="https://vite.dev/" target="_blank">
    //             <img className="logo" src={viteLogo} alt="" />
    //             Explore Vite
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://react.dev/" target="_blank">
    //             <img className="button-icon" src={reactLogo} alt="" />
    //             Learn more
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div id="social">
    //       <svg className="icon" role="presentation" aria-hidden="true">
    //         <use href="/icons.svg#social-icon"></use>
    //       </svg>
    //       <h2>Connect with us</h2>
    //       <p>Join the Vite community</p>
    //       <ul>
    //         <li>
    //           <a href="https://github.com/vitejs/vite" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#github-icon"></use>
    //             </svg>
    //             GitHub
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://chat.vite.dev/" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#discord-icon"></use>
    //             </svg>
    //             Discord
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://x.com/vite_js" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#x-icon"></use>
    //             </svg>
    //             X.com
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://bsky.app/profile/vite.dev" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#bluesky-icon"></use>
    //             </svg>
    //             Bluesky
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </section>
    //
    //   <div className="ticks"></div>
    //   <section id="spacer"></section>
    // </>

    // const cities = ["Krakow", "Amsterdam", "Warsaw", "Krasnoyarks"]
    // const [foundCities, setFoundCities] = useState([])

    const [currentCity, setCurrentCity] = useState("Warsaw, Poland") // TODO replace with object
    const [currentCityWeather, setCurrentCityWeather] = useState({})
    const [currentCityData, setCurrentCityData] = useState({})

    const [cityData, setCityData] = useState([])
    const [citySearchValue, setCitySearchValue] = useState("")


    useEffect(handleCitySearchValueChange, [citySearchValue])
    useEffect(loadCurrentCityWeather, [currentCityData])
    // useEffect(() => {console.log("weather12", currentCityWeather)}, [currentCityWeather])


    function loadCurrentCityWeather() {
        // console.log("currentCityData", currentCityData)

        let weatherData = {};
        const f = async () => {
            weatherData = await getWeather(currentCityData.latitude, currentCityData.longitude)
            // console.log("new weatherData", weatherData);
            setCurrentCityWeather(weatherData);
        }
        f();

    }

    async function updateSearchResults(val) {
        setCityData(await search(val));
    }

    function handleCitySearchValueChange() {
        // console.log("search value changed")
        const timeout = setTimeout(() => updateSearchResults(citySearchValue), 1000);
        return () => clearTimeout(timeout);
    }

    function handleCityClick(city) {
        // console.log("city clicked", city)
        if (typeof city == 'string' || city instanceof String) {
            // console.log("city is string")
            setCurrentCity(city)
        } else {
            // console.log("city is object")
            // console.log(city.city)
            setCurrentCityData(city)
            setCurrentCity(city.city)
        }
    }

    async function searchInputHandler(e) {
        setCitySearchValue(e.target.value);

        // let foundCities = []
        // const text = e.target.value;
        // for (let i = 0; i < cities.length; i++) {
        //     if (cities[i].toLowerCase().includes(text.toLowerCase())) {
        //         foundCities.push(cities[i])
        //     }
        // }
        // setFoundCities(foundCities)
        // console.log(foundCities)\
    }

    //cities={foundCities}
    return (
      <div className={"BaseApp"}>
        <div>
            <Card>
                <input className={"Search"} type="text" placeholder={"Start typing to search"} autoFocus onInput={searchInputHandler}></input>
            </Card>
          <Divider/>

            {(cityData.length > 0)? (<>
              <Card>

                <CityCard citiesData={cityData} typeIcon={"search"} onCityClick={handleCityClick}/>
              </Card>
              <Divider/>
            </>): null}
          <Card>
            <CityCard isSample={true} onCityClick={handleCityClick}/>
          </Card>
          <Divider/>
          <Card>
            <CityCard isSample={true} onCityClick={handleCityClick}/>
          </Card>
          <Divider/>
        </div>
        <VerticalDivider/>
        <div>
          <Card>
              <MainCard city={currentCity} temperature={currentCityWeather.current?.temperature} temperatureHigher={currentCityWeather.current?.temperatureHigher} temperatureLower={currentCityWeather.current?.temperatureLower} weather={currentCityWeather.current?.weather} icon={currentCityWeather.current?.icon}/>
          </Card>
            <Divider/>
          <Card>
            <DataCard/>
          </Card>
          <Divider/>
          <Card>
            <HourlyCard hourlyData={currentCityWeather.hourly}/>
          </Card>

          <Divider/>
          <Card>
            <DataCard/>
          </Card>

        </div>
        <VerticalDivider/>
        <div>
          <Card>
            <DailyCard/>
          </Card>
          <Divider/>
        </div>
      </div>
  )
}

export default App

function Card({children}) {
    return (
        <div className={"Card"}>
            {children}
        </div>
    )
}

let cachedWeather = {}

// -> weather (string), icon (string)
export function getCachedCurrentWeather(city) {
    if (cachedWeather[city]) return cachedWeather[city];
    cachedWeather[city] = randomWeather();
    return cachedWeather[city];
}

function randomWeather()  {
    const temperature = Math.floor(Math.random() * 25 - 5);
    const weather = `${(temperature > 0) ? "+": ""}${temperature}°`;
    const icons = ["sun", "cloud", "rain", "moon_cloudy"];
    const icon = icons.at(Math.floor(Math.random() * icons.length));
    return {weather, icon};
}