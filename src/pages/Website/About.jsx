import React from "react";
import WebsiteLayout from "../../components/WebsiteLayout";
import Img1 from "../../assets/image/Frame 1.png";
import Img2 from "../../assets/image/Apple iPhone 11 Pro Gold 1 (2).png";
import Img3 from "../../assets/image/pexels-mart-production-7709235.jpg";
import Img4 from "../../assets/image/button-play 1.png";
import Img5 from "../../assets/image/pexels-karolina-grabowska-6256289.jpg";
import Img6 from "../../assets/image/Icon.png";
import Img7 from "../../assets/image/pexels-pavel-danilyuk-8038328.jpg";
import Img8 from "../../assets/image/Icon 2.png";
import Img9 from "../../assets/image/Group 120524 1.png";



function About() {
  return (
    <div>
      <WebsiteLayout>
        <div className="About">
          <div class="container ">
            <div className="margin40"></div>
            <div class="banner">
              <div class="row">
                <div class="col-md-7">
                  <div class="set2">
                    <h2>
                      <b>Sleep better, live better with Mindcasts</b>
                    </h2>
                    <p>
                      Mindcasts was created to breach the gap and awareness in
                      meditation to wellness and mental health. <br />
                      <br /> We are a team of passionate individuals dedicated
                      to helping people improve their mental health and overall
                      wellbeing through meditation.
                    </p>
                  </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4">
                  <div class="pic85 margin30">
                    <img src={Img1} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container ">
            <div className="margin50"></div>
            <div class="section1">
              <div class="row">
                <div class="col-md-3 mb-3">
                  <div class="pic90">
                    <img
                      src={Img2}
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-8">
                  <div class="set2">
                    <h3>
                      <b>The app</b>
                    </h3>
                    <p>
                      Our app was founded with the belief that everyone deserves
                      access to tools that can help them find inner peace and
                      improve their mental health. Our team consists of
                      experienced meditation teachers, mental health
                      professionals, and app developers who have come together
                      to create a platform that is accessible, user-friendly,
                      and effective.
                      <br />
                      <br />
                      Our app features a wide range of guided meditations, from
                      short sessions that can be practiced on-the-go, to longer
                      meditations designed to help users achieve deeper levels
                      of relaxation and focus. We also offer courses on
                      mindfulness, stress reduction, and other topics related to
                      mental health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container ">
            <div className="margin60"></div>
            <div class="section2">
              <div class="text">
                <center>
                  <div class="col-md-6">
                    <h3>
                      <b>Over 1000+ people trust us</b>
                    </h3>
                    <p>
                      Clarity gives you the blocks & components you need to
                      create a truly professional website, landing page or admin
                      panel for your SaaS.
                    </p>
                  </div>
                </center>
              </div>
              <div class="row">
                <div class="col-md-4 p-4">
                  <div class="set2">
                    <div class="top">
                      <img
                        src={Img3}
                        alt=""
                      />
                    </div>
                    <div class="bottom">
                      <div class="min">
                        <p class="m-0">Courtney Henry</p>
                        <span>Founder of CH Beauty</span>
                      </div>
                      <div class="play">
                        <center>
                          <img src={Img4} alt="" />
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 p-4">
                  <div class="set2">
                    <div class="top">
                      <img
                        src={Img5}
                        alt=""
                      />
                    </div>
                    <div class="bottom">
                      <div class="min">
                        <p class="m-0">Albert Flores</p>
                        <span>Founder of GearUp</span>
                      </div>
                      <div class="play">
                        <center>
                          <img src={Img6} alt="" />
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 p-4">
                  <div class="set2">
                    <div class="top">
                      <img
                        src={Img7}
                        alt=""
                      />
                    </div>
                    <div class="bottom">
                      <div class="min">
                        <p class="m-0">Leslie Alexander</p>
                        <span>Co-Founder of Womenia</span>
                      </div>
                      <div class="play">
                        <center>
                          <img src={Img4} alt="" />
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <center>
                <div class="see margin30 ">
                  <p class="m-0">
                    <b>See all reviews by our customers </b>
                  </p>
                  <img src={Img8} alt="" />
                </div>
              </center>
              <div class="margin50"></div>
            </div>
          </div>
          <div class="margin60 mb-0">
            <div class="section3 ">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 pt-5 pb-5">
                    <div class="text">
                      <span>Get Started</span>
                      <h3>
                        <b>Better days ahead of you</b>
                      </h3>
                      <p>
                        We have created curated, endless resources and guides to
                        help you get to that upliftment stage. Also interact
                        with like-mind people by joining different interest
                        discussions or following your fav host
                      </p>
                      <div className="margin20"></div>
                      <a href="/host" target="_blank">
                        Download the app
                      </a>
                    </div>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-5 pt-5">
                    <img src={Img9} alt="" />
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

export default About;
