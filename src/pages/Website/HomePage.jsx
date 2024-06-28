import React from "react";
import Img from "../../assets/image/188-microphone-recording-outline.gif";
import Img1 from "../../assets/image/585-herbs-outline.gif";
import Img2 from "../../assets/image/Group 2.png";
import Img3 from "../../assets/image/pexels-anna-tarazevich-7229091.jpg";
import Img4 from "../../assets/image/pexels-charlotte-may-5965896.jpg";
import Img5 from "../../assets/image/pexels-cottonbro-studio-6686455.jpg";
import Img6 from "../../assets/image/pexels-rdne-stock-project-4910947.jpg";
import Img7 from "../../assets/image/Group 120524 1.png";
import WebsiteLayout from "../../components/WebsiteLayout";

function HomePage() {
  return (
    <div>
      <WebsiteLayout>
        <div className="HomePage">
          <div className="">
            <div class="container ">
              <div className="margin40"></div>
              <div class="banner">
                <div class="row">
                  <div class="col-md-6">
                    <div class="set2">
                      <h2>
                        <b>Take charge of your mental health and well-being.</b>
                      </h2>
                      <p>
                        Discover practical tools and techniques to manage
                        stress, anxiety, and depression, and cultivate a greater
                        sense of mindfulness and resilience.
                      </p>
                      <div class="micro margin30">
                        <img src={Img} alt="" />
                        <a href="/host" target="_blank" class="m-0">
                          Listen to Curated Resources
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2"></div>
                  <div class="col-md-4">
                    <div class="set1">
                      <div class="top">
                        <img src={Img1} alt="" />
                      </div>
                      <div class="bottom">
                        <div class="play">
                          <img src={Img2} alt="" />
                        </div>
                        <div class="min">
                          <p class="m-0">Growing happy minds</p>
                          <span>20 MIN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container ">
              <div className="margin50"></div>
              <div class="section1">
                <div class="row">
                  <div class="col-md-4">
                    <div class="set1">
                      <div class="top">
                        <img src={Img3} alt="" />
                      </div>
                      <div class="bottom">
                        <div class="play">
                          <img src={Img2} alt="" />
                        </div>
                        <div class="min">
                          <p class="m-0">Growing happy minds</p>
                          <span>20 MIN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-7">
                    <div class="set2">
                      <h3>
                        <b>We match you with topics that are your preference</b>
                      </h3>
                      <p>
                        Discover practical tools and techniques to manage
                        stress, anxiety, and depression, and cultivate a greater
                        sense of mindfulness and resilience.
                      </p>
                      <ul>
                        <li>Positive thinking</li>
                        <li>Anxiety</li>
                        <li>Sleep</li>
                        <li>Remain calm</li>
                        <li>Ignite yourself</li>
                        <li>Mental awareness</li>
                        <li>Self-improvement</li>
                        <li>Outgoing</li>
                        <li>Reduce stress</li>
                        <li>Improve focus</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container ">
              <div className="margin60"></div>
              <div class="section2">
                <div class="text">
                  <div class="col-md-6">
                    <h3>
                      <b>Latest podcast episodes</b>
                    </h3>
                    <p>
                      Discover practical tools and techniques to manage stress,
                      anxiety, and depression, and cultivate a greater sense of
                      mindfulness and resilience.
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 p-4">
                    <div class="set1">
                      <div class="top">
                        <img src={Img4} alt="" />
                      </div>
                      <div class="bottom">
                        <div class="play">
                          <img src={Img2} alt="" />
                        </div>
                        <div class="min">
                          <p class="m-0">Growing happy minds</p>
                          <span>20 MIN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 p-4">
                    <div class="set1">
                      <div class="top">
                        <img src={Img5} alt="" />
                      </div>
                      <div class="bottom">
                        <div class="play">
                          <img src={Img2} alt="" />
                        </div>
                        <div class="min">
                          <p class="m-0">Growing happy minds</p>
                          <span>20 MIN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 p-4">
                    <div class="set1">
                      <div class="top">
                        <img src={Img6} alt="" />
                      </div>
                      <div class="bottom">
                        <div class="play">
                          <img src={Img2} alt="" />
                        </div>
                        <div class="min">
                          <p class="m-0">Growing happy minds</p>
                          <span>20 MIN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="margin60 mb-0">
              <div class="section3 ">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 pt-5">
                      <div class="text">
                        <span>Get Started</span>
                        <h3>
                          <b>Better days ahead of you</b>
                        </h3>
                        <p>
                          We have created curated, endless resources and guides
                          to help you get to that upliftment stage. Also
                          interact with like-mind people by joining different
                          interest discussions or following your fav host
                        </p>
                        <div className="margin30"></div>
                        <a href="/host" target="_blank">
                          Download the app
                        </a>
                      </div>
                    </div>
                    <div class="col-md-1"></div>
                    <div class="col-md-5 pt-5">
                      <img src={Img7} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WebsiteLayout>
    </div>
  );
}

export default HomePage;
