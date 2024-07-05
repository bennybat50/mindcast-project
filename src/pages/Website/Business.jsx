import React, { useEffect, useState } from "react";
import Img1 from "../../assets/image/business/business-1.png";
import Img2 from "../../assets/image/Group 2.png";
import Img3 from "../../assets/image/business/headache-1.png";
import Img4 from "../../assets/image/business/headphone-1.png";
import Img5 from "../../assets/image/business/check-list-1.png";
import Img6 from "../../assets/image/business/business-4.png";
import Img7 from "../../assets/image/business/business-2.png";
import Img8 from "../../assets/image/business/business-3.png";
import Img9 from "../../assets/image/business/business-5.png";
import WebsiteLayout from "../../components/WebsiteLayout";
import Img11 from "../../assets/image/Group 120524 1.png";
import { Link } from "react-router-dom";

function Business() {
  
  const [employeeCount, setEmployeeCount] = useState(5);
  const [totalCost, setTotalCost] = useState(249.95);
  const [emailAddress, setEmailAddress] = useState("");
  const [assignedName, setAssignedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  const events = ["mousemove", "touchmove"];

  const handleSlideChange = (event) => {
    const newEmployeeCount = parseInt(event.target.value);
    setEmployeeCount(newEmployeeCount);
    setTotalCost(49.99 * newEmployeeCount);
  };

  useEffect(() => {
    if(!firstLoad){
      document.getElementById("customRange1").value=5;
      setFirstLoad(true)
    }
    
    events.forEach((event) => {
      document
        .getElementById("customRange1")
        .addEventListener(event, handleSlideChange);
    });

    return () => {
      events.forEach((event) => {
        document
          .getElementById("customRange1")
          .removeEventListener(event, handleSlideChange);
      });
    };
  });

  const handleBuyItemClick = () => {

    if (emailAddress === "") {
      alert("Please provide your email address");
    } else if (assignedName === "") {
      alert("Please provide your Business Name");
    } else { 
      setLoading(true);
      const paymentData = {
        assignedName,
        email: emailAddress,
        totalUsers: employeeCount,
        totalMonths: 12,
      };
      sessionStorage.setItem("paymentData", JSON.stringify(paymentData));

      fetch(
        "https://mindcastserver-a98c5305de98.herokuapp.com/api/v1/user/stripe-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === true) {
            setLoading(true);
            window.location.href = data.data.paymentLink.url;
          }
        })
        .catch((error) => {
          alert("Error occurred!");
          setLoading(false);
        });
     
    }
  };

  return (
    <div>
      <WebsiteLayout>
        <div className="Business">
          <div className="">
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                  <form id="submitForm">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="btn-close btn-light"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="container p-4">
                        <h1>
                          <b className="text-white">The Plan</b>
                        </h1>
                        <h5>
                          Support Employee Well-being, Propel Business Success.
                        </h5>
                        <small>
                          Subscription codes will be sent to your company email
                          provided below.
                        </small>
                        <small>
                          If you need subscription for more than 100 employee,{" "}
                          <a
                              href="https://calendly.com/mindcasts-info/30min?month=2024-06"
                              target="_blank"
                              class="text-info"
                              rel="noreferrer"
                            >
                             <b class="text-info"> please book a demo</b>
                            </a>
                           
                        </small>
                        <br />
                        <br />
                        <div class="userDetails">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="" class="text-light">
                                  Business Email
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email_address"
                                  required
                                  value={emailAddress}
                                  onChange={(e) =>
                                    setEmailAddress(e.target.value)
                                  }
                                  class="form-control"
                                  placeholder="Enter business email"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="" class="text-light">
                                  Business Name
                                </label>
                                <input
                                  type="text"
                                  name="assignedName"
                                  id="assignedName"
                                  value={assignedName}
                                  onChange={(e) =>
                                    setAssignedName(e.target.value)
                                  }
                                  required
                                  class="form-control"
                                  placeholder="Enter business name"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                        <div class="showRangeData">
                          <input
                            type="range"
                            class="form-range"
                            id="customRange1"
                            min="5"
                            max="100"
                            step="1"
                          />
                          <br />
                          <br />
                          <div class="row rangeDetails">
                            <div class="col-md-4 border-right">
                              <h3 id="employee">{employeeCount}</h3>
                              <small>Employees</small>
                            </div>
                            <div class="col-md-4 border-right">
                              <h3 id="per-year">$49.99</h3>
                              <small>Per person / year</small>
                            </div>
                            <div class="col-md-4">
                              <h3 id="total">${totalCost.toFixed(2)}</h3>
                              <small>Total / year</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="container text-center">
                        <div class="row">
                          <div class="col-md-4">
                            <Link
                              to="#"
                              style={{ cursor: "pointer !important;" }}
                              class="btn btn-primary"
                              id="buyItem"
                              onClick={handleBuyItemClick}
                            >
                              {loading?  <div class='loader'></div> : ' Buy Now '}
                             
                            </Link>
                          </div>
                          <div class="col-md-5">
                            <Link
                              to="https://calendly.com/mindcasts-info/30min?month=2024-06"
                              target="_blank"
                              class="btn btn-secondary"
                              rel="noreferrer"
                            >
                              Book a free demo
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="">
              <div class="container ">
                <div className="margin40"></div>
                <div class="banner">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="set2">
                        <h2>
                          <b>Empower Your Team, Elevate Your Business</b>
                        </h2>
                        <p>
                          In today’s fast-paced work environment, employee
                          well-being is more important than ever. Mindcast
                          offers a comprehensive mental health solution designed
                          to support your team’s mental wellness, reduce stress,
                          and increase overall job satisfaction.
                        </p>
                        <div class="row">
                          <div class="col-md-3 col-sm-12">
                            <div
                              class="btn-outline-purple pointer"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              View Plan
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-1"></div>
                    <div class="col-md-3">
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
              <div class=" ">
                <div class="container padding50">
                  <div class="section1">
                    <h2>
                      <b>Key Features you will love</b>
                    </h2>
                    <p>
                      Discover practical tools and techniques to manage stress,
                      anxiety, and depression, and cultivate a greater sense of
                      mindfulness and resilience.
                    </p>
                    <br />
                    <br />
                    <div class="row">
                      <div class="col-md-4 mb-5">
                        <div class="icon-bg">
                          <div class="text-center">
                            <br />
                            <img src={Img3} alt="" />
                            <br />
                            <br />
                            <p>
                              Proven strategies for managing stress and anxiety.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-4 mb-5">
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <span> </span>
                          <div class="icon-bg">
                            <div class="text-center">
                              <br />
                              <img src={Img4} alt="" />
                              <br />
                              <br />
                              <p>
                                Accessible resources and professional support.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-4 mb-5">
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <div class="icon-bg">
                            <span> </span>
                            <div class="text-center">
                              <br />
                              <img src={Img5} alt="" />
                              <br /> <br />
                              <p>
                                Personalised mental health plans tailored to
                                individual needs.
                              </p>
                            </div>
                          </div>
                        </div>
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
                      <h2>
                        <b>The Advantages of Mindcasts for Your Company</b>
                      </h2>
                      <p>
                        Happy and healthy employees are more productive and
                        loyal. With Mindcasts, your team will have access to
                        tools and resources to help them thrive both personally
                        and professionally.
                      </p>
                    </div>
                  </div>
                  <div class="row">
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
                    <div class="col-md-4 p-4">
                      <div class="set1">
                        <div class="top">
                          <img src={Img7} alt="" />
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
                          <img src={Img8} alt="" />
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
                  <br /> <br /> <br />
                  <div class="row">
                    <div class="col-md-3 mb-5">
                      <div class="text-bg">
                        <div class="text-center">
                          <br />
                          <h1>
                            <b>1</b>
                          </h1>
                          <p>Guided meditation and mindfulness exercises.</p>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-3 mb-5">
                      <div class="text-bg">
                        <div class="text-center">
                          <br />
                          <h1>
                            <b>2</b>
                          </h1>
                          <p>Regular mood check-ins and assessments.</p>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-3 mb-5">
                      <div class="text-bg">
                        <div class="text-center">
                          <br />
                          <h1>
                            <b>3</b>
                          </h1>
                          <p>
                            Personalised mental health plans tailored to
                            individual needs.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 mb-5">
                      <div class="text-bg">
                        <div class="text-center">
                          <br />
                          <h1>
                            <b>4</b>
                          </h1>
                          <p>
                            Recommended resources according to your preference
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br /> <br /> <br />
              <div class="container ">
                <div className="margin30"></div>
                <div class="section1">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="set1">
                        <div class="top">
                          <img src={Img9} alt="" />
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
                          <b>Company Benefits</b>
                        </h3>
                        <p>
                          By joining Mindcasts, your company will not only see
                          an improvement in employee well-being but also in
                          overall productivity and company culture.
                        </p>
                        <br /> <br />
                        <div class="row">
                          <div class="col-md-6 mb-5">
                            <div class="benfit-bg">
                              <div class="text-center">
                                <br />
                                <h3>
                                  <b>Increased Productivity</b>
                                </h3>
                                <br />
                                <p>
                                  Employees with better mental health are more
                                  focused and efficient.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 ">
                            <div class="benfit-bg">
                              <div class="text-center">
                                <br />
                                <h3>
                                  <b>Enhanced Reputation</b>
                                </h3>
                                <br />
                                <p>
                                  Companies that prioritise employee wellness
                                  are viewed more favourably by clients,
                                  partners, and potential hires.
                                </p>
                              </div>
                            </div>
                            <br /> <br />
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
                      <div class="col-md-6 pt-5 pb-5">
                        <div class="text">
                          <span>Building a Positive Company Image</span>
                          <h3>
                            <b>Ready to Transform Your Workplace?</b>
                          </h3>
                          <p>
                            Join the growing number of companies that are taking
                            a proactive approach to mental health. With
                            Mindcasts, you're not just investing in your
                            employees – you're investing in the future success
                            of your company.
                          </p>
                          <br />
                          <div class="row">
                            <div class="col-md-4 col-sm-12 pointer">
                              <a
                                class="btn-purple"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                href="."
                              >
                                View Plan
                              </a>
                            </div>
                            <div class="col-md-6 col-sm-12 pointer">
                              <a
                                href="https://calendly.com/mindcasts-info/30min?month=2024-06"
                                target="_blank"
                                class="btn-purple text-white"
                                rel="noreferrer"
                              >
                                Book a free demo
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-1"></div>
                      <div class="col-md-5 pt-5">
                        <img src={Img11} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer margin60" id="footer_side"></div>
            </div>
          </div>
        </div>
      </WebsiteLayout>
    </div>
  );
}

export default Business;
