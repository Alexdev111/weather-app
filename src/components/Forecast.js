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

const API_KEY = 'f20a13b40af67463fd877f6d98a2f22c'
const latitude = '47.06270550000001'
const longitude = '28.8048974'
let API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,temperature_2m,is_day,rain,relative_humidity_2m,wind_speed_10m,wind_direction_10m&hourly=precipitation,weather_code,temperature_2m&daily=apparent_temperature_max,apparent_temperature_min,weather_code&timezone=auto`
// let newApi = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=f20a13b40af67463fd877f6d98a2f22c'

function getWeatherIcon(id) {
    if(id === 0) return sunnyDayIcon;
    if(id === 1) return cloudyDay1Icon;
    if([2,3].includes(id)) return cloudyDay3Icon;
    if([45,48].includes(id)) return fogIcon;
    if([51,53,55,61,63,65,80,81].includes(id)) return rainy6Icon;
    if([56,57,66,67].includes(id)) return rainAndSnowMixIcon;
    if(id === 71) return snowy4Icon;
    if(id === 73) return snowy5Icon;
    if([75,77,85,86].includes(id)) return snowy6Icon;
    if(id === 82) return rainAndSleetMixIcon;
    if([95,96,99].includes(id)) return thunderIcon;
}    
    function Forecast() {
            function newFunc() {
                let newApi = `https://api.openweathermap.org/geo/1.0/direct?q=Chisinau&limit=5&appid=${API_KEY}`
                fetch(newApi)
                .then(response => response.json())
                .then(data => {
                    console.log('Default City Data:', data);
                })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
        }

            useEffect(() => {
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
                        // renderWeatherCurrently(info.current);
                        renderWeatherDaily(info.daily);
                        console.log(info);
                    })
                    .catch(error => {
                        console.error("Error fetching weather data:", error);
                    });
                    newFunc();
                    return () => {
                        document.getElementById('submit-button').removeEventListener('click', getCoordinates);
                        document.getElementById('location-search-large').removeEventListener('keydown', EnterKeyDown);
                    }
            },[]);        
            
        async function renderWeather(info) {
                    console.log('Current weather data ==>')
                    let div = {
                    'Latitude:': latitude, 'Longitude:': longitude,
                    'Temperature:':info.temperature_2m,
                    'Wind Speed:':info.wind_speed_10m,
                    'now:':info.is_day === 0 ? 'night' : 'day',
                    'Humidity:':info.relative_humidity_2m,
                    'Rain:':info.rain,
                    'WMO Weather Code:': info.weather_code
                    }
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

                    const currentWeatherSummaryImg = document.querySelector('.curentWeatherIcon')
                    // const currentWeatherSummaryFutureImg = document.querySelectorAll('.weatherIcon')
                    const id = info.weather_code;
                    getWeatherIcon(id)      
                    currentWeatherSummaryImg.src = getWeatherIcon(id)
                    // currentWeatherSummaryFutureImg.src = getWeatherIcon(id)
                

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
    let urlC = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;

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
                        console.log('Future forecast data:', json);

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

                        const currentWeatherSummaryImg = document.querySelector('.curentWeatherIcon')
                        const id = json.current.weather_code;
                        getWeatherIcon(id)      
                        currentWeatherSummaryImg.src = getWeatherIcon(id)

                        const windDirectElement = document.getElementById('compass-direction');
                        windDirectElement.textContent = getWindDirections(json.current.wind_direction_10m);



                        const currentWeatherSummaryEverydayImg = document.querySelectorAll('.weatherIcon');
                        const ids = json.daily.weather_code;

                        function getWeatherIconFuture(id) {
                            if (id === 0) return sunnyDayIcon;
                            if (id === 1) return cloudyDay1Icon;
                            if ([2, 3].includes(id)) return cloudyDay3Icon;
                            if ([45, 48].includes(id)) return fogIcon;
                            if ([51, 53, 55, 61, 63, 65, 80, 81].includes(id)) return rainy6Icon;
                            if ([56, 57, 66, 67].includes(id)) return rainAndSnowMixIcon;
                            if (id === 71) return snowy4Icon;
                            if (id === 73) return snowy5Icon;
                            if ([75, 77, 85, 86].includes(id)) return snowy6Icon;
                            if (id === 82) return rainAndSleetMixIcon;
                            if ([95, 96, 99].includes(id)) return thunderIcon;
                            return sunnyDayIcon;
                        }

                        ids.forEach((id, index) => {
                            if (currentWeatherSummaryEverydayImg[index]) {
                                currentWeatherSummaryEverydayImg[index].src = getWeatherIconFuture(id);
                            }
                        });

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
// -------------------------------------------- function renderWeatherCurrently(data)  -------------------------------------
        
                async function renderWeatherDaily(data) {
                    const maxTemperatures = data.apparent_temperature_max;
                    const minTemperatures = data.apparent_temperature_min;

                    maxTemperatures.forEach((maxTemp, index) => {
                    if (index === 0) return;

                    const maxGradeElement = document.getElementById(`max-grade-${index}`);
                    const minGradeElement = document.getElementById(`min-grade-${index}`);

                    if (maxGradeElement) maxGradeElement.textContent = Math.round(maxTemp) + '°C';
                    if (minGradeElement) minGradeElement.textContent = Math.round(minTemperatures[index]) + '°C';
                });

                        const currentWeatherSummaryEverydayImg = document.querySelectorAll('.weatherIcon');
                        const ids = data.weather_code;

                        function getWeatherIconFuture(id) {
                            if (id === 0) return sunnyDayIcon;
                            if (id === 1) return cloudyDay1Icon;
                            if ([2, 3].includes(id)) return cloudyDay3Icon;
                            if ([45, 48].includes(id)) return fogIcon;
                            if ([51, 53, 55, 61, 63, 65, 80, 81].includes(id)) return rainy6Icon;
                            if ([56, 57, 66, 67].includes(id)) return rainAndSnowMixIcon;
                            if (id === 71) return snowy4Icon;
                            if (id === 73) return snowy5Icon;
                            if ([75, 77, 85, 86].includes(id)) return snowy6Icon;
                            if (id === 82) return rainAndSleetMixIcon;
                            if ([95, 96, 99].includes(id)) return thunderIcon;
                            return sunnyDayIcon;
                        }

                        ids.forEach((id, index) => {
                            if (currentWeatherSummaryEverydayImg[index]) {
                                currentWeatherSummaryEverydayImg[index].src = getWeatherIconFuture(id);
                            }
                        });
                    }

        return (
            <div>
            <Header />
            <div className="hero">
            <container className="search-container-1">
            <div id="form1" className="form-large">
                <input type="text" maxLength={50} id="location-search-large" placeholder="Find your location"></input>
                <button id="submit-button">Find</button>
            </div>
            </container>
            </div>
            <div className="forecast-table-wrapper">
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
                            <div className="celsius">°C</div>                            
                            <div className="curent-icon-block" >
                                <img alt="0"  className="curentWeatherIcon" src={sunnyDayIcon}></img>
                            </div>
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
                            <img alt="day-icon" className="weatherIcon" src={dayIcon}></img>
                        </div>
                        <div id='max-grade-1'>25°C</div>
                        <div id="min-grade-1">25°C</div>
                </div>
            </div>

            <div className="forecast" style={{backgroundColor: '#323544'}}>
                <div className="day" style={{backgroundColor: '#2d303d'}}>{week[(currentDayIndex + 2) % 7]}</div>
                <div className="day-card">
                        <div className="forecast-img">
                            <img alt="day-icon"  className="weatherIcon" src={dayIcon}></img>
                        </div>
                        <div id='max-grade-2'>25°C</div>
                        <div id="min-grade-2">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#262936'}}>
                <div className="day" style={{backgroundColor: '#222530'}}>{week[(currentDayIndex + 3) % 7]}</div>
                <div className="day-card">
                        <div className="forecast-img">
                            <img alt="day-icon"  className="weatherIcon" src={dayIcon}></img>
                        </div>
                        <div id='max-grade-3'>25°C</div>
                        <div id="min-grade-3">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#323544'}}>
                <div className="day" style={{backgroundColor: '#2d303d'}}>{week[(currentDayIndex + 4) % 7]}</div>
                <div className="day-card">
                    <div className="forecast-img">
                        <img alt="day-icon"  className="weatherIcon" src={dayIcon}></img>
                    </div>
                        <div id='max-grade-4'>25°C</div>
                        <div id="min-grade-4">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#262936'}}>
                <div className="day" style={{backgroundColor: '#222530'}}>{week[(currentDayIndex + 5) % 7]}</div>
                <div className="day-card">
                    <div className="forecast-img">
                        <img alt="day-icon"  className="weatherIcon" src={dayIcon}></img>
                    </div>
                        <div id='max-grade-5'>25°C</div>
                        <div id="min-grade-5">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#323544'}}>
                <div className="day" style={{backgroundColor: '#2d303d'}}>{week[(currentDayIndex + 6) % 7]}</div>
                <div className="day-card">
                    <div className="forecast-img">
                        <img alt="day-icon"  className="weatherIcon" src={dayIcon}></img>
                    </div>
                        <div id='max-grade-6'>25°C</div>
                        <div id="min-grade-6">25°C</div>
                    </div>
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
