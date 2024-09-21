// methods: GET, POST DELETE, PUT
// status: 200, 500, 404

import React from "react";
// import axios from "axios";
import Forecast, { formattedDate2, formattedDate3 } from "./components/Forecast";
import play_button from './images/icons/play-button@2x.png';
import arrow from './images/icons/arrow.png';


import live_camera_1 from './images/live-camera-1.jpg';
import live_camera_2 from './images/live-camera-2.jpg';
import live_camera_3 from './images/live-camera-3.jpg';
import live_camera_4 from './images/live-camera-4.jpg';

import awsome1 from './images/awsome1.jpg'
import awsome2 from './images/awsome2.jpg'
import awsome3 from './images/awsome3.jpg'
import awsome4 from './images/awsome4.jpg'
import awsome5 from './images/awsome5.jpg'
import awsome6 from './images/awsome6.jpg'
import awsome7 from './images/awsome7.jpg'
import awsome8 from './images/awsome8.jpg'
import awsome9 from './images/awsome9.jpg'
// import awsome10 from '../src/images/awsome10.jpg'

function app() {

        return(
            <div id="boss">
            <div className="weather-container">
            <Forecast />
            {/* LIVE CAMERAS */}
            <div className="block">
                <div className="container-live-cameras">
                    <h2 className="section-text">Live cameras</h2>

                    <div className="live-camera-container">
                        <div className="live-camera-block first">
                        <div className="live-camera">
                            <img id="lc" alt="live-camera" src={live_camera_1}></img>
                                <div className="icon-container">
                                    <img src={play_button} alt="play-button" id="fa"/>
                                </div>
                            <div className="live-camera-title">New York</div>
                            <div className="live-camera-date">{formattedDate2}</div>
                        </div>
                        </div>

                        <div className="live-camera-block">
                        <div className="live-camera">
                            <img id="lc" alt="live-camera" src={live_camera_2}></img>
                                <div className="icon-container">
                                    <img src={play_button} alt="play-button" id="fa"/>
                                </div>
                            <div className="live-camera-title">Los Angeles</div>
                            <div className="live-camera-date">{formattedDate2}</div>
                        </div>
                        </div>

                        <div className="live-camera-block">
                        <div className="live-camera">
                            <img id="lc" alt="live-camera" src={live_camera_3}></img>
                                <div className="icon-container">
                                    <img src={play_button} alt="play-button" id="fa"/>
                                </div>
                            <div className="live-camera-title">Chicago</div>
                            <div className="live-camera-date">{formattedDate2}</div>
                        </div>
                        </div>

                        <div className="live-camera-block">
                        <div className="live-camera">
                            <img id="lc" alt="live-camera" src={live_camera_4}></img>
                                <div className="icon-container">
                                    <img src={play_button} alt="play-button" id="fa"/>
                                </div>
                            <div className="live-camera-title">London</div>
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
                        <div className="desc-title">Doloremque laudantium totam sequi</div>
                        <div className="desc-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Illo saepe assumenda dolorem modi, expedita voluptatum
                        ducimus necessitatibus. Asperiores quod reprehenderit
                        necessitatibus harum, mollitia, odit et consequatur
                        maxime nisi amet doloremque.
                        </div>
                        <img src={arrow} alt="icon" id="arrow-icon"></img>
                        </div>


                        <div className="desc-date">06.10</div>
                        <div className="description">
                        <div className="desc-title">Doloremque laudantium totam sequi</div>
                        <div className="desc-text">
                        Nobis architecto consequatur ab, ea, eum autem aperiam
                        accusantium placeat vitae facere explicabo temporibus
                        minus distinctio cum optio quis, dignissimos eius
                        aspernatur fuga. Praesentium totam, corrupti beatae
                        amet expedita veritatis.
                        </div>
                        <img src={arrow} alt="icon" id="arrow-icon"></img>
                        </div>

                        <div className="desc-date">06.10</div>
                        <div className="description">
                        <div className="desc-title">Doloremque laudantium totam sequi</div>
                        <div className="desc-text">
                        Enim impedit officiis placeat qui recusandae doloremque possimus,
                        iusto blanditiis, quam optio delectus maiores. Possimus rerum,
                        velit cum natus eos. Cumque pariatur beatae asperiores,
                        esse libero quas ad dolorem. Voluptates.
                        </div>
                        <img src={arrow} alt="icon" id="arrow-icon"></img>
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
                                <div className="text-header">Natus error sit voluptatem accusantium</div>
                                <div className="text-info">Doloremque laudantium totam rem aperiam Inventore veritatis et quasi architecto beatae vitae.</div>
                            </div>
                                <div className="img-block">
                                    <img src={arrow} alt="arrow" id="arrow-icon i2"></img>
                                </div>
                            <div className="block-elements">
                                <div className="text-header">Natus error sit voluptatem accusantium</div>
                                <div className="text-info">Doloremque laudantium totam rem aperiam Inventore veritatis et quasi architecto beatae vitae.</div>
                            </div>
                                <div className="img-block">
                                    <img src={arrow} alt="arrow" id="arrow-icon i2"></img>
                                </div>
                            <div className="block-elements">
                                <div className="text-header">Natus error sit voluptatem accusantium</div>
                                <div className="text-info">Doloremque laudantium totam rem aperiam Inventore veritatis et quasi architecto beatae vitae.</div>
                            </div>
                        </div>


                        <div id="block-element">
                        <div className="block-title t2">Weather analyssis</div>
                            <div className="elements">
                                <div id="img-block">
                                <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                                </div>
                                <div className="element">
                                    <div className="element-text">Accusantium doloremque laudantium rem aperiam</div>
                                    <div className="hr"></div>
                                </div>

                                <div id="img-block">
                                <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                                </div>
                                <div className="element">
                                    <div className="element-text">Eaque ipsa quae ab illo inventore veritatis quasi</div>
                                    <div className="hr"></div>
                                </div>
                                
                                <div id="img-block">
                                <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                                </div>
                                <div className="element">
                                    <div className="element-text">Architecto beatae vitae dicta sunt explicabo</div>
                                    <div className="hr"></div>
                                </div>

                                <div id="img-block">
                                <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                                </div>
                                <div className="element">
                                    <div className="element-text">Nemo enim ipsam voluptatem quia voluptas</div>
                                    <div className="hr"></div>
                                </div>

                                <div id="img-block">
                                <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                                </div>
                                <div className="element">
                                    <div className="element-text">Aspernatur aut odit aut fugit, sed quia consequuntur</div>
                                    <div className="hr"></div>
                                </div>

                                <div id="img-block">
                                <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                                </div>
                                <div className="element">
                                    <div className="element-text">Magni dolores eos qui ratione voluptatem sequi</div>
                                    <div className="hr"></div>
                                </div>

                                <div id="img-block">
                                <img src={arrow} alt="arrow" id="arrow-icon i3"></img>
                                </div>
                                <div className="element">
                                    <div className="element-text">Neque porro quisquam est qui dolorem ipsum quia</div>
                                </div>
                                </div>
                        </div>


                        <div className="block-element">
                            <div className="block-title-t3">Awesome Photos</div>
                                <div className="main-block-b2">
                                    <div className="aws-photos-block">
                                        <img src={awsome1} alt="awsome-img" id="awsome-photos-image"></img>
                                    </div>
                                    <div className="aws-photos-block">
                                        <img src={awsome2} alt="awsome-img" id="awsome-photos-image"></img>
                                    </div>
                                    <div className="aws-photos-block">
                                        <img src={awsome3} alt="awsome-img" id="awsome-photos-image"></img>
                                    </div>
                                    <div className="aws-photos-block">
                                        <img src={awsome4} alt="awsome-img" id="awsome-photos-image"></img>
                                    </div>
                                    <div className="aws-photos-block">
                                        <img src={awsome5} alt="awsome-img" id="awsome-photos-image"></img>
                                    </div>
                                    <div className="aws-photos-block">
                                        <img src={awsome6} alt="awsome-img" id="awsome-photos-image"></img>
                                    </div>
                                    <div className="aws-photos-block">
                                        <img src={awsome7} alt="awsome-img" id="awsome-photos-image"></img>
                                    </div>
                                    <div className="aws-photos-block">
                                        <img src={awsome8} alt="awsome-img" id="awsome-photos-image"></img>
                                    </div>
                                    <div className="aws-photos-block">
                                        <img src={awsome9} alt="awsome-img" id="awsome-photos-image"></img>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* FOOTHER */}

            <div className="footer-big-block">
                <div className="footer-main-block">
                    <div className="footer-elements">
                    <container className="footer-container">
                        <container className="search-container-2">
                    <form method="post" id="form2" className="form-small">
                        <input type="search" maxLength={15} id="location-search-small" placeholder="Find your location"></input>
                        <input type="submit" value={'Find'} id="submit-small"></input>
                    </form>
                </container>

                        <div className="social-media">
                            <ul>
                                <li><a href="https://www.facebook.com"><span></span></a></li>
                                <li><a href="https://www.twitter.com"><span></span></a></li>
                                <li><a href="app.js"><span></span></a></li>
                                <li><a href="app.js"><span></span></a></li>
                            </ul>
                        </div>
                    </container>

                    <footer>WeatherNews {formattedDate3}. Developed by Alex Gurgurov. All rights reserved</footer>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }


export default app