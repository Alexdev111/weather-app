import React, { useState, useEffect } from "react";
import Loader from "./components/Loader.js";
// import axios from "axios";
import Forecast, {
  formattedDate2,
  formattedDate3,
} from "./components/Forecast.js";
import play_button from "./images/icons/play-button@2x.png";
import arrow from "./images/icons/arrow.png";
import logo from "./images/logo.png";

import budapestCam from "./images/budapest.jpg";
import chicagoCam from "./images/chicago.jpg";
import new_yorkCam from "./images/new york.jpg";
import parisCam from "./images/paris.jpg";

import awsome1 from "./images/awsome1.jpg";
import awsome2 from "./images/awsome2.jpg";
import awsome3 from "./images/awsome3.jpg";
import awsome4 from "./images/awsome4.jpg";
import awsome5 from "./images/awsome5.jpg";
import awsome6 from "./images/awsome6.jpg";
import awsome7 from "./images/awsome7.jpg";
import awsome8 from "./images/awsome8.jpg";
import awsome9 from "./images/awsome9.jpg";
// import awsome10 from '../src/images/awsome10.jpg'
function App() {
  const [loading, setLoading] = useState(true);

  const handleDataLoaded = () => setLoading(false);

  return (
    
    <div id="boss">
      {loading && <Loader />}
      <div className="weather-container" style={{ display: loading ? 'none' : 'block' }}>
        <Forecast onDataLoaded={handleDataLoaded} />
        <div className="block">
          <div className="container-live-cameras">
            <h2 className="section-text">Live cameras</h2>

            <div className="live-camera-container">
              <div className="live-camera-block first">
                <div className="live-camera">
                  <a
                    href="https://www.youtube.com/watch?v=rnXIjl_Rzy4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      id="lc"
                      className="new-york-camera"
                      alt="live-camera"
                      src={new_yorkCam}
                    ></img>
                    <div className="icon-container">
                      <img src={play_button} alt="play-button" id="fa" />
                    </div>
                  </a>
                  <div className="live-camera-title">New York City</div>
                  <div className="live-camera-date">{formattedDate2}</div>
                </div>
              </div>

              <div className="live-camera-block">
                <div className="live-camera">
                  <a
                    href="https://www.youtube.com/watch?v=4In_qA6dLcg&pp=ygURcGFyaXMgbGl2ZSBjYW1lcmE%3D"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      id="lc"
                      className="paris-camera"
                      alt="live-camera"
                      src={parisCam}
                    ></img>
                    <div className="icon-container">
                      <img src={play_button} alt="play-button" id="fa" />
                    </div>
                  </a>
                  <div className="live-camera-title">Paris, France</div>
                  <div className="live-camera-date">{formattedDate2}</div>
                </div>
              </div>

              <div className="live-camera-block">
                <div className="live-camera">
                  <a
                    href="https://www.youtube.com/watch?v=sQxL8t0gtu8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      id="lc"
                      className="chicago-camera"
                      alt="live-camera"
                      src={chicagoCam}
                    ></img>
                    <div className="icon-container">
                      <img src={play_button} alt="play-button" id="fa" />
                    </div>
                  </a>
                  <div className="live-camera-title">Chicago</div>
                  <div className="live-camera-date">{formattedDate2}</div>
                </div>
              </div>

              <div className="live-camera-block">
                <div className="live-camera">
                  <a
                    href="https://www.earthcam.com/world/hungary/budapest/?cam=hotelvictoria"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      id="lc"
                      className="budapest-camera"
                      alt="live-camera"
                      src={budapestCam}
                    ></img>
                    <div className="icon-container">
                      <img src={play_button} alt="play-button" id="fa" />
                    </div>
                  </a>
                  <div className="live-camera-title">Budapest, Hungary</div>
                  <div className="live-camera-date">{formattedDate2}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MORE DESCRIPTION */}
        <div className="description-block">
          <div className="description-container">
            <div className="sections">
              <div className="desc-date">06.10</div>
              <div className="description">
                <div className="desc-title">Discover Stunning Landscapes</div>
                <div className="desc-text">
                  The world is full of breathtaking places, and thanks to live
                  cameras, you can explore them from the comfort of your home.
                  Whether it’s the towering peaks of the Alps, the serene
                  beaches of the Maldives, or the rolling countryside of
                  Tuscany, live streaming technology allows you to experience
                  stunning landscapes in real time. See how nature changes
                  through the seasons, witness spectacular sunsets, and immerse
                  yourself in the beauty of distant places with just a click.
                </div>
                {/* <img src={arrow} alt="icon" id="arrow-icon"></img> */}
              </div>

              <div className="desc-date">06.10</div>
              <div className="description">
                <div className="desc-title">
                  The Technology Behind Live Streaming
                </div>
                <div className="desc-text">
                  Have you ever wondered how live cameras deliver high-quality
                  footage in real-time? Streaming technology has evolved
                  significantly, allowing cameras to broadcast 24/7 with minimal
                  latency. From high-definition lenses and advanced encoding
                  techniques to AI-powered motion detection, live streaming has
                  become an essential tool for tourism, security, and
                  entertainment. Learn how these technologies work and how they
                  bring the world closer to you.
                </div>
                {/* <img src={arrow} alt="icon" id="arrow-icon"></img> */}
              </div>

              <div className="desc-date">06.10</div>
              <div className="description">
                <div className="desc-title">
                  Urban Exploration Through Live Cameras
                </div>
                <div className="desc-text">
                  Cities are constantly evolving, and live cameras provide a
                  unique way to witness these changes in real time. Whether it’s
                  the bustling streets of New York, the charming alleys of
                  Paris, or the vibrant nightlife of Tokyo, urban exploration
                  has never been easier. See how people go about their daily
                  lives, watch major events unfold, and experience the heartbeat
                  of the world’s most iconic cities from your screen.
                </div>
                {/* <img src={arrow} alt="icon" id="arrow-icon"></img> */}
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="big-container">
          <div className="main-block">
            <div className="main-elements-block">
              <div id="block-element">
                <div className="block-title">Application features</div>
                <div className="img-block">
                  <img src={arrow} alt="arrow" id="arrow-icon i2"></img>
                </div>
                <div className="block-elements">
                  <div className="text-header">Real-Time Weather Updates</div>
                  <div className="text-info">
                    Stay informed with instant weather updates for your
                    location. Get alerts about temperature changes, storms, and
                    other important climate conditions.
                  </div>
                </div>
                <div className="img-block">
                  <img src={arrow} alt="arrow" id="arrow-icon i2"></img>
                </div>
                <div className="block-elements">
                  <div className="text-header">Interactive Weather Maps</div>
                  <div className="text-info">
                    Explore dynamic weather maps with real-time satellite
                    imagery, storm tracking, and radar data to monitor global
                    weather patterns.
                  </div>
                </div>
                <div className="img-block">
                  <img src={arrow} alt="arrow" id="arrow-icon i2"></img>
                </div>
                <div className="block-elements">
                  <div className="text-header">Customizable Notifications</div>
                  <div className="text-info">
                    Set up personalized weather alerts for rain, snow, or
                    extreme conditions to stay prepared no matter where you are.
                  </div>
                </div>
              </div>

              <div id="block-element">
                <div className="block-title">Weather analyssis</div>
                <div className="elements">
                  <div id="img-block">
                    <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                  </div>
                  <div className="element">
                    <div className="element-text">
                      Detailed forecasts with high accuracy for the next 7 days.
                    </div>
                    <div className="hr"></div>
                  </div>

                  <div id="img-block">
                    <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                  </div>
                  <div className="element">
                    <div className="element-text">
                      Climate insights, including humidity, wind speed, and UV
                      index.
                    </div>
                    <div className="hr"></div>
                  </div>

                  <div id="img-block">
                    <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                  </div>
                  <div className="element">
                    <div className="element-text">
                      Reports on seasonal trends and extreme weather patterns.
                    </div>
                    <div className="hr"></div>
                  </div>

                  <div id="img-block">
                    <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                  </div>
                  <div className="element">
                    <div className="element-text">
                      Humidity monitoring to help you plan outdoor activities.
                    </div>
                    <div className="hr"></div>
                  </div>

                  <div id="img-block">
                    <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                  </div>
                  <div className="element">
                    <div className="element-text">
                      Oceanic and atmospheric conditions for sailing and
                      aviation.
                    </div>
                    <div className="hr"></div>
                  </div>

                  <div id="img-block">
                    <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                  </div>
                  <div className="element">
                    <div className="element-text">
                      Global climate change insights and environmental impact
                      reports.
                    </div>
                    <div className="hr"></div>
                  </div>

                  <div id="img-block">
                    <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                  </div>
                  <div className="element">
                    <div className="element-text">
                      Search your city or country and get weather information.
                    </div>
                  </div>
                </div>
              </div>

              <div className="block-element">
                <div className="block-title">Awesome Photos</div>
                <div className="main-block-b2">
                  <div className="aws-photos-block">
                    <img
                      src={awsome1}
                      alt="awsome-img"
                      id="awsome-photos-image"
                    ></img>
                  </div>
                  <div className="aws-photos-block">
                    <img
                      src={awsome2}
                      alt="awsome-img"
                      id="awsome-photos-image"
                    ></img>
                  </div>
                  <div className="aws-photos-block">
                    <img
                      src={awsome3}
                      alt="awsome-img"
                      id="awsome-photos-image"
                    ></img>
                  </div>
                  <div className="aws-photos-block">
                    <img
                      src={awsome4}
                      alt="awsome-img"
                      id="awsome-photos-image"
                    ></img>
                  </div>
                  <div className="aws-photos-block">
                    <img
                      src={awsome5}
                      alt="awsome-img"
                      id="awsome-photos-image"
                    ></img>
                  </div>
                  <div className="aws-photos-block">
                    <img
                      src={awsome6}
                      alt="awsome-img"
                      id="awsome-photos-image"
                    ></img>
                  </div>
                  <div className="aws-photos-block">
                    <img
                      src={awsome7}
                      alt="awsome-img"
                      id="awsome-photos-image"
                    ></img>
                  </div>
                  <div className="aws-photos-block">
                    <img
                      src={awsome8}
                      alt="awsome-img"
                      id="awsome-photos-image"
                    ></img>
                  </div>
                  <div className="aws-photos-block">
                    <img
                      src={awsome9}
                      alt="awsome-img"
                      id="awsome-photos-image"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="footer-big-block">
          <div className="footer-main-block">
            <div className="footer-container">
              <div className="footer-el-logo">
                <img
                  src={logo}
                  alt="WeatherNews"
                  className="footer-logo-img"
                ></img>
              </div>
              <div className="footer-el-description">
                <strong>WeatherNews</strong> is an updated app with new
                technologies that helps you manage your plans by showing you the
                precipitation expected in the coming days with high accuracy and
                a very low error percentage.
                <p style={{ color: "#ff7d00" }}>
                  ⎯⎯ ୨{" "}
                  <strong style={{ color: "#ff7d00" }}>
                    Stay on trend ━━━ Be the trend{" "}
                  </strong>
                  ୧ ⎯⎯
                </p>
              </div>
              <div className="social-media">
                <ul>
                  <li>
                    <a href="https://www.facebook.com">
                      <span></span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com">
                      <span></span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gmail.com">
                      <span></span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/alexandru-gr/">
                      <span></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <footer>
              © WeatherNews {formattedDate3}. Developed by Alexandru Gurgurov.
              All rights reserved
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
