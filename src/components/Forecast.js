import React from "react";
import { useEffect } from "react";
import { ReactComponent as MySVG1 } from '../images/icons/icon-1.svg';
import UmbrellaIcon from '../images/humidity-icon.png';
import Header from "./Header";
// import WindIcon from '../images/icon-wind.png';
import CompassIcon from '../images/compass-icon.png';
// import icon1 from '../images/icons/icon-3.svg';
// import icon2 from '../images/icons/icon-3.svg';
import icon3 from '../images/icons/icon-2.svg';
import icon4 from '../images/icons/icon-2.svg';
import icon5 from '../images/icons/icon-2.svg';
import icon6 from '../images/icons/icon-2.svg';
import icon7 from '../images/icons/icon-2.svg';
import icon8 from '../images/icons/icon-2.svg';
import WIndIcon from '../images/wind-icon.png'; 

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
let API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,temperature_2m,is_day,rain,relative_humidity_2m,wind_speed_10m,wind_direction_10m&hourly=precipitation,weather_code,temperature_2m&daily=apparent_temperature_max,apparent_temperature_min&timezone=auto`

    function Forecast() {
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
                        renderWeatherCurrently(info.current);
                        renderWeatherDaily(info.daily);
                        console.log(info);
                        console.log(info.hourly.time[24])
                    })
                    .catch(error => {
                        console.error("Error fetching weather data:", error);
                    });
                    return () => {
                        document.getElementById('submit-button').removeEventListener('click', getCoordinates);
                        document.getElementById('location-search-large').removeEventListener('keydown', EnterKeyDown);
                    }
            }, []);
            
        async function renderWeather(info) {
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
            let apiKey = 'AIzaSyBOBMYfXOoZtjq5x96alyK_XGWAs8HHlRU';
            let cityName = document.getElementById('location-search-large').value;
            let urlC = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${apiKey}`;

            fetch(urlC)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const location = data.results[0].geometry.location;
                        const afterLatitude = location.lat;
                        const afterLongitude = location.lng; 
                        console.log(`${cityName} ==> Latitude: ${afterLatitude}, Longitude: ${afterLongitude}`);
                        
                        let cityElement = document.querySelector('.city');
                        if (cityElement) {
                            cityElement.textContent = cityName;
                        } else {
                             console.error('City element not found.');
                        }

                    const urlTest = `https://api.open-meteo.com/v1/forecast?latitude=${afterLatitude}&longitude=${afterLongitude}&current=weather_code,temperature_2m,is_day,rain,relative_humidity_2m,wind_speed_10m,wind_direction_10m&hourly=precipitation,weather_code,temperature_2m&daily=apparent_temperature_max,apparent_temperature_min&timezone=auto`;
            
                fetch(urlTest)
                    .then(resp => resp.json())
                    .then(json => {
                        let div = `
                            ---------------AFTER CLICK DATA FORECAST---------------
                            Temperature max: ${json.daily.apparent_temperature_max}
                            Temperature min: ${json.daily.apparent_temperature_min}
                            Wind Speed: ${json.current.wind_speed_10m}
                            WInd Direction: ${getWindDirections(json.current.wind_direction_10m)}
                            now: ${json.current.is_day === 0 ? 'night' : 'day'}
                            Humidity: ${json.current.relative_humidity_2m}
                            Rain ${json.current.rain}%
                            WMO Weather Code: ${json.current.weather_code}
                            `
                            console.log(div)

                                const currentTemp = Math.round(json.current.temperature_2m)
                                document.getElementById('grade').innerHTML = currentTemp

                                const currentHumidity = Math.round(json.current.relative_humidity_2m)
                                document.getElementById('humidity-procent').innerHTML = currentHumidity + '%'

                                const currentWindSpeed = Math.round(json.current.wind_speed_10m)
                                document.getElementById('wind-speed').innerHTML = currentWindSpeed + 'km/h'

                            function getWindDirections(degrees) {
                                const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West']
                                    const index = Math.round((degrees % 360) / 45);
                                return directions[index % 8];
                                }
                                const windDirectElement = document.getElementById('compass-direction')
                                windDirectElement.textContent = getWindDirections(json.current.wind_direction_10m)

                                const max_grade = Math.round(json.daily.apparent_temperature_max[1])
                                const max_gradeElement = document.getElementById("max-grade-1")
                                max_gradeElement.textContent = max_grade + '°C'

                                const min_grade = Math.round(json.daily.apparent_temperature_min[1])
                                const min_gradeElement = document.getElementById("min-grade-1")
                                min_gradeElement.textContent = min_grade + '°C'

                                const max_grade_2 = Math.round(json.daily.apparent_temperature_max[2])
                                const max_gradeElement_2 = document.getElementById("max-grade-2")
                                max_gradeElement_2.textContent = max_grade_2 + '°C'

                                const min_grade_2 = Math.round(json.daily.apparent_temperature_min[2])
                                const min_gradeElement_2 = document.getElementById("min-grade-2")
                                min_gradeElement_2.textContent = min_grade_2 + '°C'

                                const max_grade_3 = Math.round(json.daily.apparent_temperature_max[3])
                                const max_gradeElement_3 = document.getElementById("max-grade-3")
                                max_gradeElement_3.textContent = max_grade_3 + '°C'

                                const min_grade_3 = Math.round(json.daily.apparent_temperature_min[3])
                                const min_gradeElement_3 = document.getElementById("min-grade-3")
                                min_gradeElement_3.textContent = min_grade_3 + '°C'

                                const max_grade_4 = Math.round(json.daily.apparent_temperature_max[4])
                                const max_gradeElement_4 = document.getElementById("max-grade-4")
                                max_gradeElement_4.textContent = max_grade_4 + '°C'

                                const min_grade_4 = Math.round(json.daily.apparent_temperature_min[4])
                                const min_gradeElement_4 = document.getElementById("min-grade-4")
                                min_gradeElement_4.textContent = min_grade_4 + '°C'

                                const max_grade_5 = Math.round(json.daily.apparent_temperature_max[5])
                                const max_gradeElement_5 = document.getElementById("max-grade-5")
                                max_gradeElement_5.textContent = max_grade_5 + '°C'

                                const min_grade_5 = Math.round(json.daily.apparent_temperature_min[5])
                                const min_gradeElement_5 = document.getElementById("min-grade-5")
                                min_gradeElement_5.textContent = min_grade_5 + '°C'

                                const max_grade_6 = Math.round(json.daily.apparent_temperature_max[6])
                                const max_gradeElement_6 = document.getElementById("max-grade-6")
                                max_gradeElement_6.textContent = max_grade_6 + '°C'

                                const min_grade_6 = Math.round(json.daily.apparent_temperature_min[6])
                                const min_gradeElement_6 = document.getElementById("min-grade-6")
                                min_gradeElement_6.textContent = min_grade_6 + '°C'
                            })
                            .catch (wrong => console.error("Something wrong with after forecast table data: ", wrong))
                        }

                })
                .catch (error => {
                    console.error("Error fetching coordonates: ", error)
                }); 

                // _________________________________________________________________
            }

            function renderWeatherCurrently(data) {
                    console.log(`Wather code is ${data.weather_code}`)
                        const wmo = data.weather_code
                        switch (wmo) {
                            case 0:
                                const overcast = document.createElement('div')
                                const overcastImg = document.createElement('img')
                                overcastImg.src = '../images/icons/Weather News Icons/sun.svg';
                                overcastImg.height = 70
                                overcastImg.width = 100
                                overcast.appendChild(overcastImg)
                                console.log("Value is ", wmo)
                                const image0 = document.getElementById('icon1')
                                image0.innerHTML = overcast
                            break;
                            case 1:
                                console.log("Value is ", wmo)
                            break;
                            case 2:
                                console.log("Value is ", wmo)
                            break;
                            case 3:
                                console.log("Value is ", wmo)
                            break;
                            case 45:
                                console.log("Value is ", wmo)
                            break;
                            case 48:
                                console.log("Value is ", wmo)
                            break;
                            case 51:
                                console.log("Value is ", wmo)
                            break;
                            case 53:
                                console.log("Value is ", wmo)
                            break;
                            case 55:
                                console.log("Value is ", wmo)
                            break;
                            case 56:
                                console.log("Value is ", wmo)
                            break;
                            case 57:
                                console.log("Value is ", wmo)
                            break;
                            case 61:
                                console.log("Value is ", wmo)
                            break;
                            case 63:
                                console.log("Value is ", wmo)
                            break;
                            case 65:
                                console.log("Value is ", wmo)
                            break;
                            case 66:
                                console.log("Value is ", wmo)
                            break;
                            case 67:
                                console.log("Value is ", wmo)
                            break;
                            case 71:
                                console.log("Value is ", wmo)
                            break;
                            case 73:
                                console.log("Value is ", wmo)
                            break;
                            case 75:
                                console.log("Value is ", wmo)
                            break;
                            case 77:
                                console.log("Value is ", wmo)
                            break;
                            case 80:
                                console.log("Value is ", wmo)
                            break;
                            case 81:
                                console.log("Value is ", wmo)
                            break;
                            case 82:
                                console.log("Value is ", wmo)
                            break;
                            case 85:
                                console.log("Value is ", wmo)
                            break;
                            case 86:
                                console.log("Value is ", wmo)
                            break;
                            case 95:
                                console.log("Value is ", wmo)
                            break;
                            case 96:
                                console.log("Value is ", wmo)
                            break;
                            case 99:
                                console.log("Value is ", wmo)
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
                            <MySVG1 id="icon1"/>
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
                            <img alt="day-icon" id="icon-3" src={icon3} style={{width: '48px'}}></img>
                        </div>
                        <div id='max-grade-1'>25°C</div>
                        <div id="min-grade-1">25°C</div>
                </div>
            </div>

            <div className="forecast" style={{backgroundColor: '#323544'}}>
                <div className="day" style={{backgroundColor: '#2d303d'}}>{week[(currentDayIndex + 2) % 7]}</div>
                <div className="day-card">
                        <div className="forecast-img">
                            <img alt="day-icon" src={icon4} style={{width: '48px'}}></img>
                        </div>
                        <div id='max-grade-2'>25°C</div>
                        <div id="min-grade-2">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#262936'}}>
                <div className="day" style={{backgroundColor: '#222530'}}>{week[(currentDayIndex + 3) % 7]}</div>
                <div className="day-card">
                        <div className="forecast-img">
                            <img alt="day-icon" src={icon5} style={{width: '48px'}}></img>
                        </div>
                        <div id='max-grade-3'>25°C</div>
                        <div id="min-grade-3">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#323544'}}>
                <div className="day" style={{backgroundColor: '#2d303d'}}>{week[(currentDayIndex + 4) % 7]}</div>
                <div className="day-card">
                    <div className="forecast-img">
                        <img alt="day-icon" src={icon6} style={{width: '48px'}}></img>
                    </div>
                        <div id='max-grade-4'>25°C</div>
                        <div id="min-grade-4">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#262936'}}>
                <div className="day" style={{backgroundColor: '#222530'}}>{week[(currentDayIndex + 5) % 7]}</div>
                <div className="day-card">
                    <div className="forecast-img">
                        <img alt="day-icon" src={icon7} style={{width: '48px'}}></img>
                    </div>
                        <div id='max-grade-5'>25°C</div>
                        <div id="min-grade-5">25°C</div>
                </div>
            </div>
    
            <div className="forecast" style={{backgroundColor: '#323544'}}>
                <div className="day" style={{backgroundColor: '#2d303d'}}>{week[(currentDayIndex + 6) % 7]}</div>
                <div className="day-card">
                    <div className="forecast-img">
                        <img alt="day-icon" src={icon8} style={{width: '48px'}}></img>
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
