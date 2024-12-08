import React from "react";
import { useEffect } from "react";
// import { ReactComponent as MySVG1 } from '../images/icons/simple/day.svg';
import UmbrellaIcon from '../images/humidity-icon.png';
import Header from "./Header";
import CompassIcon from '../images/compass-icon.png';
import dayIcon from '../images/icons/simple/day.svg';
import WIndIcon from '../images/wind-icon.png'; 

// ICONS IMPORT
import sunnyDayIcon from '../images/icons/simple/sunny-day.svg';
import cloudyDay1Icon from '../images/icons/simple/cloudy-day-1.svg';
import cloudyDay3Icon from '../images/icons/simple/cloudy-day-3.svg';
import fogIcon from '../images/icons/simple/fog.svg';
import rainy6Icon from '../images/icons/simple/rainy-6.svg';
import rainAndSnowMixIcon from '../images/icons/simple/rain-and-snow-mix.svg';
import snowy4Icon from '../images/icons/simple/snowy-4.svg';
import snowy5Icon from '../images/icons/simple/snowy-5.svg';
import snowy6Icon from '../images/icons/simple/snowy-6.svg';
import rainAndSleetMixIcon from '../images/icons/simple/rain-and-sleet-mix.svg';
import thunderIcon from '../images/icons/simple/thunder.svg';



const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
const today_type_day = new Date()
const currentDayIndex = today_type_day.getDay()
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday']

const today = new Date();
const hour = today.getHours().toString().padStart(2, '0');
const min = today.getMinutes().toString().padStart(2, '0'); 
const day = today.getDate();
const year = today.getFullYear();
const monthIndex = today.getMonth();
const formattedDate1 = day + " " + monthNames[monthIndex];
const formattedDate2 = day + " " + monthNames[monthIndex] + " " + hour + ":" + min;
const formattedDate3 = year;

const latitude = '47.06270550000001'
const longitude = '28.8048974'
let API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,temperature_2m,is_day,rain,relative_humidity_2m,wind_speed_10m,wind_direction_10m&hourly=precipitation,weather_code,temperature_2m&daily=apparent_temperature_max,apparent_temperature_min,weather_code&timezone=auto`
// let newApi = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=f20a13b40af67463fd877f6d98a2f22c'

    function Forecast() {
            function newFunc() {
                let newApi = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=f20a13b40af67463fd877f6d98a2f22c'
                fetch(newApi)
                .then(response => response.json())
                .then(data => {
                    console.log('newFunc Data:', data);  // Log newFunc data here
                    console.log('City:', data[0].name);
                    console.log('Latitude:', data[0].lat);
                    console.log('Longitude:', data[0].lon);
                })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
        }

            useEffect(() => {
                console.log('Component Mounted');
                document.getElementById('submit-button').addEventListener('click', getCoordinates);
                function EnterKeyDown(event) {
                    if(event.key === 'Enter')
                    getCoordinates();
                }
                document.getElementById('location-search-large').addEventListener('keydown', EnterKeyDown);
                fetch(API_URL)
                    .then(response => response.json())
                    .then(info => {
                        renderWeather(info.current);
                        renderWeatherCurrently(info.current);
                        renderWeatherDaily(info.daily);
                        console.log(info);
                        console.log(info.hourly.time[24])
                    })
                    .catch(error => {
                        console.error("Error fetching weather data:", error);
                    });
                    newFunc();
                    return () => {
                        document.getElementById('submit-button').removeEventListener('click', getCoordinates);
                        document.getElementById('location-search-large').removeEventListener('keydown', EnterKeyDown);
                    }
            }, []);
            
        async function renderWeather(info) {
                console.log('Rendering Weather Info:', info); // Log weather data
                    let div = `
                    ---------------CURRENT DATA FORECAST---------------
                    Latitude: ${latitude} Longitude: ${longitude}
                    Temperature: ${info.temperature_2m}
                    Wind Speed: ${info.wind_speed_10m}
                    now: ${info.is_day === 0 ? 'night' : 'day'}
                    Humidity: ${info.relative_humidity_2m}
                    Rain ${info.rain}%
                    WMO Weather Code:  ${info.weather_code}
                    `
                    console.log(div)
                    const currTemp = Math.round(info.temperature_2m)
                    const currTempElement = document.getElementById('grade')
                    currTempElement.textContent = currTemp

                    
                    const windSpeed = Math.round(info.wind_speed_10m)
                    const windSpeedElement = document.getElementById('wind-speed')
                    windSpeedElement.textContent = windSpeed + 'km/h'

                    const humidity = info.relative_humidity_2m
                    const humidityElement = document.getElementById('humidity-procent')
                    humidityElement.textContent = humidity + '%'
                

                function getWindDirections(degrees) {
                    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West']
                    const index = Math.round((degrees % 360) / 45);
                    return directions[index % 8];
                }
                const windDirectElement = document.getElementById('compass-direction')
                windDirectElement.textContent = getWindDirections(info.wind_direction_10m)
            }
//  ------------------------------SEARCH FETCH-----------------------------------------
function getCoordinates() {
    let cityName = document.getElementById('location-search-large').value;
    console.log('City Searched:', cityName); // Log the city being searched

    let urlC = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=f20a13b40af67463fd877f6d98a2f22c`;

    fetch(urlC)
        .then(response => response.json())
        .then(data => {
            console.log('Coordinates Data:', data); // Log coordinates data
            if (data.length > 0) {
                const location = data[0]; // First result from the API
                console.log(`${cityName} ==> Latitude: ${location.lat}, Longitude: ${location.lon}`);

                let cityElement = document.querySelector('.city');
                if (cityElement) {
                    cityElement.textContent = cityName;
                } else {
                    console.error('City element not found.');
                }

                const urlTest = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=weather_code,temperature_2m,is_day,rain,relative_humidity_2m,wind_speed_10m,wind_direction_10m&hourly=precipitation,weather_code,temperature_2m&daily=apparent_temperature_max,apparent_temperature_min,weather_code&timezone=auto`;

                fetch(urlTest)
                    .then(resp => resp.json())
                    .then(json => {
                        console.log('Forecast data:', json);

                        const currentTemp = Math.round(json.current.temperature_2m);
                        document.getElementById('grade').innerHTML = currentTemp;

                        const currentHumidity = Math.round(json.current.relative_humidity_2m);
                        document.getElementById('humidity-procent').innerHTML = currentHumidity + '%';

                        const currentWindSpeed = Math.round(json.current.wind_speed_10m);
                        document.getElementById('wind-speed').innerHTML = currentWindSpeed + 'km/h';

                        function getWindDirections(degrees) {
                            const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
                            const index = Math.round((degrees % 360) / 45);
                            return directions[index];
                        }

                        const windDirectElement = document.getElementById('compass-direction');
                        windDirectElement.textContent = getWindDirections(json.current.wind_direction_10m);

                        // Display max/min temperatures for each day
                        const maxTemp = (dayIndex) => Math.round(json.daily.apparent_temperature_max[dayIndex]) + '°C';
                        const minTemp = (dayIndex) => Math.round(json.daily.apparent_temperature_min[dayIndex]) + '°C';

                        document.getElementById("max-grade-1").textContent = maxTemp(1);
                        document.getElementById("min-grade-1").textContent = minTemp(1);

                        document.getElementById("max-grade-2").textContent = maxTemp(2);
                        document.getElementById("min-grade-2").textContent = minTemp(2);

                        document.getElementById("max-grade-3").textContent = maxTemp(3);
                        document.getElementById("min-grade-3").textContent = minTemp(3);

                        document.getElementById("max-grade-4").textContent = maxTemp(4);
                        document.getElementById("min-grade-4").textContent = minTemp(4);

                        document.getElementById("max-grade-5").textContent = maxTemp(5);
                        document.getElementById("min-grade-5").textContent = minTemp(5);

                        document.getElementById("max-grade-6").textContent = maxTemp(6);
                        document.getElementById("min-grade-6").textContent = minTemp(6);
                    })
                    .catch(error => console.error("Something went wrong with the forecast table data: ", error));
            }
        })
        .catch(error => {
            console.error("Error fetching coordinates: ", error);
        });
}


            function renderWeatherCurrently(data) {
                console.log('Current Weather Code:', data.weather_code)
                        const wmo = data.weather_code;
                        switch (wmo) {
                            case 0:
                                console.log("Clear sky with WMO code: ", wmo)
                                const case0 = document.getElementById('icon-1')
                                if(case0) {
                                    case0.src = sunnyDayIcon
                                }
                            break;
                            case 1:
                                console.log("Mainly clear with WMO code: ", wmo)
                                const case1 = document.getElementById('icon-1')
                                if(case1) {
                                    case1.src = cloudyDay1Icon
                                }                              
                            break;
                            case 2:
                                console.log("Partly cloudy with WMO code: ", wmo)
                                const case2 = document.getElementById('icon-1')
                                if(case2) {
                                    case2.src = cloudyDay3Icon
                                }
                            break;
                            case 3:
                                console.log("Overcast with WMO code: ", wmo)
                                const case3 = document.getElementById('icon-2')
                                console.log(case3)
                                if(case3) {
                                    case3.src = cloudyDay3Icon
                                }
                            break;
                            case 45:
                                console.log("Fog with WMO code: ", wmo)
                                const case45 = document.getElementById('icon-1')
                                if(case45) {
                                    case45.src = fogIcon
                                }
                            break;
                            case 48:
                                console.log("Fog with WMO code: ", wmo)
                                const case48 = document.getElementById('icon-1')
                                if(case48) {
                                    case48.src = fogIcon
                                }
                            break;
                            case 51:    
                                console.log("Drizzle: Light with WMO code: ", wmo)
                                const case51 = document.getElementById('icon-1')
                                if(case51) {
                                    case51.src = rainy6Icon
                                }
                            break;
                            case 53:
                                console.log("Drizzle: moderate with WMO code: ", wmo)
                                const case53 = document.getElementById('icon-1')
                                if(case53) {
                                    case53.src = rainy6Icon;
                                }
                            break;
                            case 55:
                                console.log("Drizzle: dense intensity with WMO code: ", wmo)
                                const case55 = document.getElementById('icon-1')
                                if(case55) {
                                    case55.src = rainy6Icon
                                }
                            break;
                            case 56:
                                console.log("Freezing Drizzle: Light with WMO code: ", wmo)
                                const case56 = document.getElementById('icon-1')
                                if(case56) {
                                    case56.src = rainAndSnowMixIcon
                                }
                            break;
                            case 57:
                                console.log("Freezing Drizzle: dense intensity with WMO code: ", wmo)
                                const case57 = document.getElementById('icon-1')
                                if(case57) {
                                    case57.src = rainAndSnowMixIcon
                                }
                            break;
                            case 61:
                                console.log("Rain: Slight with WMO code: ", wmo)
                                const case61 = document.getElementById('icon-1')
                                if(case61) {
                                    case61.src = rainy6Icon
                                }
                            break;
                            case 63:
                                console.log("Rain: moderate with WMO code: ", wmo)
                                const case62 = document.getElementById('icon-1')
                                if(case62) {
                                    case62.src = rainy6Icon
                                }
                            break;
                            case 65:
                                console.log("Rain: heavy intensity with WMO code: ", wmo)
                                const case65 = document.getElementById('icon-1')
                                if(case65) {
                                    case65.src = rainy6Icon
                                }
                            break;
                            case 66:
                                console.log("Freezing Rain: Light with WMO code: ", wmo)
                                const case66 = document.getElementById('icon-1')
                                if(case66) {
                                    case66.src = rainAndSnowMixIcon
                                }
                            break;
                            case 67:
                                console.log("Freezing Rain: heavy intensity with WMO code: ", wmo)
                                const case67 = document.getElementById('icon-1')
                                if(case67) {
                                    case67.src = rainAndSnowMixIcon
                                }
                            break;
                            case 71:
                                console.log("Snow fall: Slight intensity with WMO code: ", wmo)
                                const case71 = document.getElementById('icon-1')
                                if(case71) {
                                    case71.src = snowy4Icon
                                }
                            break;
                            case 73:
                                console.log("Snow fall: moderate intensity with WMO code: ", wmo)
                                const case73 = document.getElementById('icon-1')
                                if(case73) {
                                    case73.src = snowy5Icon
                                }
                            break;
                            case 75:
                                console.log("Snow fall: heavy intensity with WMO code: ", wmo)
                                const case75 = document.getElementById('icon-1')
                                if(case75) {
                                    case75.src = snowy6Icon
                                }
                            break;
                            case 77:
                                console.log("Snow grains with WMO code: ", wmo)
                                const case77 = document.getElementById('icon-1')
                                if(case77) {
                                    case77.src = snowy6Icon
                                }
                            break;
                            case 80:
                                console.log("Rain showers: Slight with WMO code: ", wmo)
                                const case80= document.getElementById('icon-1')
                                if(case80) {
                                    case80.src = rainy6Icon
                                }
                            break;
                            case 81:
                                console.log("Rain showers: moderate with WMO code: ", wmo)
                                const case81 = document.getElementById('icon-1')
                                if(case81) {
                                    case81.src = rainy6Icon
                                }
                            break;
                            case 82:
                                console.log("Rain showers: violent with WMO code: ", wmo)
                                const case82 = document.getElementById('icon-1')
                                if(case82) {
                                    case82.src = rainAndSleetMixIcon
                                }
                            break;
                            case 85:
                                console.log("Snow showers slight with WMO code: ", wmo)
                                const case85 = document.getElementById('icon-1')
                                if(case85) {
                                    case85.src = snowy6Icon
                                }
                            break;
                            case 86:
                                console.log("Snow showers heavy with WMO code: ", wmo)
                                const case86 = document.getElementById('icon-1')
                                if(case86) {
                                    case86.src = snowy6Icon
                                }
                            break;
                            case 95:
                                console.log("Thunderstorm: Slight or moderate with WMO code: ", wmo)
                                const case95 = document.getElementById('icon-1')
                                if(case95) {
                                    case95.src = thunderIcon
                                }
                            break;
                            case 96:
                                console.log("Thunderstorm with slight hail with WMO code: ", wmo)
                                const case96 = document.getElementById('icon-1')
                                if(case96) {
                                    case96.src = thunderIcon
                                }
                            break;
                            case 99:
                                console.log("Thunderstorm with heavy hail with WMO code: ", wmo)
                                const case99 = document.getElementById('icon-1')
                                if(case99) {
                                    case99.src = thunderIcon
                                }
                            break;

                        default: console.error("No WMO codes")
                    }
                    
                    
                    // const clearSunset = document.getElementById('icon1')
                    // clearSunset.setAttribute('src', '../images/icons/icon-7.svg')
                    // clearSunset.setAttribute('windth','100')
                    // clearSunset.setAttribute('height','70')


                    
                    // clearSunset.innerHTML = "<img src='../images/icons/icon-5.svg' width='400px' height='150px'>"
                }           
    async function renderWeatherDaily(data) {
        console.log('Rendering Daily Forecast:', data);
                let div = `
                    ---------------FUTURE DATA FORECAST---------------
                    T max: ${data.apparent_temperature_max}
                    T min: ${data.apparent_temperature_min}
                    `
                    console.log(div)
                        const max_grade = Math.round(data.apparent_temperature_max[1])
                        const max_gradeElement = document.getElementById("max-grade-1")
                        max_gradeElement.textContent = max_grade + '°C'

                        const min_grade = Math.round(data.apparent_temperature_min[1])
                        const min_gradeElement = document.getElementById("min-grade-1")
                        min_gradeElement.textContent = min_grade + '°C'

                        const max_grade_2 = Math.round(data.apparent_temperature_max[2])
                        const max_gradeElement_2 = document.getElementById("max-grade-2")
                        max_gradeElement_2.textContent = max_grade_2 + '°C'

                        const min_grade_2 = Math.round(data.apparent_temperature_min[2])
                        const min_gradeElement_2 = document.getElementById("min-grade-2")
                        min_gradeElement_2.textContent = min_grade_2 + '°C'

                        const max_grade_3 = Math.round(data.apparent_temperature_max[3])
                        const max_gradeElement_3 = document.getElementById("max-grade-3")
                        max_gradeElement_3.textContent = max_grade_3 + '°C'

                        const min_grade_3 = Math.round(data.apparent_temperature_min[3])
                        const min_gradeElement_3 = document.getElementById("min-grade-3")
                        min_gradeElement_3.textContent = min_grade_3 + '°C'

                        const max_grade_4 = Math.round(data.apparent_temperature_max[4])
                        const max_gradeElement_4 = document.getElementById("max-grade-4")
                        max_gradeElement_4.textContent = max_grade_4 + '°C'

                        const min_grade_4 = Math.round(data.apparent_temperature_min[4])
                        const min_gradeElement_4 = document.getElementById("min-grade-4")
                        min_gradeElement_4.textContent = min_grade_4 + '°C'

                        const max_grade_5 = Math.round(data.apparent_temperature_max[5])
                        const max_gradeElement_5 = document.getElementById("max-grade-5")
                        max_gradeElement_5.textContent = max_grade_5 + '°C'

                        const min_grade_5 = Math.round(data.apparent_temperature_min[5])
                        const min_gradeElement_5 = document.getElementById("min-grade-5")
                        min_gradeElement_5.textContent = min_grade_5 + '°C'

                        const max_grade_6 = Math.round(data.apparent_temperature_max[6])
                        const max_gradeElement_6 = document.getElementById("max-grade-6")
                        max_gradeElement_6.textContent = max_grade_6 + '°C'

                        const min_grade_6 = Math.round(data.apparent_temperature_min[6])
                        const min_gradeElement_6 = document.getElementById("min-grade-6")
                        min_gradeElement_6.textContent = min_grade_6 + '°C'
                }

        return (
            <div>
            <Header />
            <div className="hero">
            <container className="search-container-1">
            <div id="form1" className="form-large">
                <input type="text" maxLength={15} id="location-search-large" placeholder="Find your location"></input>
                <button id="submit-button">Find</button>
            </div>
            </container>
            </div>

            <div className='forecast-table'>
            <div className="table">
                <div className="table-wrapper">
                    <div className="today">
                    <div className="today-date">
                        <div className="today">{week[currentDayIndex]}</div>
                        <div className="date">{formattedDate1}</div>
                    </div>
                    <div className="forecast-info">
                        <div className="city">Moldova, Chișinău</div>
                        <div id="number">
                            <div id="grade"></div>
                            <sup id="sup">o</sup>
                            C
                            <img alt="day-icon"  id="icon-1" src={sunnyDayIcon}></img>
                        </div>
                    <div className="day-details">
                        <div id="umbrella-icon">
                            <img src={UmbrellaIcon} alt="umbrella-icon" id="umbrella"/>
                                <div id="humidity-procent"></div>
                        </div>
                        <div id="wind-icon">
                            <img src={WIndIcon} alt="wind-icon" id="wind"/>
                            <div id="wind-speed"></div>
                        </div>
                        <div id="compass-icon">
                            <img src={CompassIcon} alt="compass-icon" id="compass"/>
                            <div id="compass-direction"></div>
                        </div>
                    </div>
                    </div>
                </div>
    
            <div className="forecast" style={{backgroundColor: '#262936'}}>
                <div className="day" style={{backgroundColor: '#222530'}}>{week[(currentDayIndex + 1) % 7]}</div>
                <div className="day-card">
                        <div className="forecast-img">
                            <img alt="day-icon" id="icon-2" src={dayIcon} style={{width: '48px'}}></img>
                        </div>
                        <div id='max-grade-1'>25°C</div>
                        <div id="min-grade-1">25°C</div>
                </div>
            </div>

            <div className="forecast" style={{backgroundColor: '#323544'}}>
                <div className="day" style={{backgroundColor: '#2d303d'}}>{week[(currentDayIndex + 2) % 7]}</div>
                <div className="day-card">
                        <div className="forecast-img">
                            <img alt="day-icon"  id="icon-3" src={dayIcon} style={{width: '48px'}}></img>
                        </div>
                        <div id='max-grade-2'>25°C</div>
                        <div id="min-grade-2">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#262936'}}>
                <div className="day" style={{backgroundColor: '#222530'}}>{week[(currentDayIndex + 3) % 7]}</div>
                <div className="day-card">
                        <div className="forecast-img">
                            <img alt="day-icon"  id="icon-4" src={dayIcon} style={{width: '48px'}}></img>
                        </div>
                        <div id='max-grade-3'>25°C</div>
                        <div id="min-grade-3">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#323544'}}>
                <div className="day" style={{backgroundColor: '#2d303d'}}>{week[(currentDayIndex + 4) % 7]}</div>
                <div className="day-card">
                    <div className="forecast-img">
                        <img alt="day-icon"  id="icon-5" src={dayIcon} style={{width: '48px'}}></img>
                    </div>
                        <div id='max-grade-4'>25°C</div>
                        <div id="min-grade-4">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#262936'}}>
                <div className="day" style={{backgroundColor: '#222530'}}>{week[(currentDayIndex + 5) % 7]}</div>
                <div className="day-card">
                    <div className="forecast-img">
                        <img alt="day-icon"  id="icon-6" src={dayIcon} style={{width: '48px'}}></img>
                    </div>
                        <div id='max-grade-5'>25°C</div>
                        <div id="min-grade-5">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#323544'}}>
                <div className="day" style={{backgroundColor: '#2d303d'}}>{week[(currentDayIndex + 6) % 7]}</div>
                <div className="day-card">
                    <div className="forecast-img">
                        <img alt="day-icon"  id="icon-7" src={dayIcon} style={{width: '48px'}}></img>
                    </div>
                        <div id='max-grade-6'>25°C</div>
                        <div id="min-grade-6">25°C</div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    </div>
    )   
}
export default Forecast;
export { formattedDate1, formattedDate2, formattedDate3};
