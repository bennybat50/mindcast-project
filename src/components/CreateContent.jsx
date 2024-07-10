import axios from "axios";
import React, { useEffect, useState } from "react";

import { ThreeDotsVertical, ArrowRightShort } from "react-bootstrap-icons";
import profileImageOne from "../assets/image/profileImage-one.webp";

import { BASE_URL, USER_DOMAIN } from "../utils/config";
// import singleHost from './SingelHost';
import Resource from "./Resource";
import { Cloudinary } from "@cloudinary/url-gen";
import Search from "./Search";
import CreateContentModal from "./CreateContentModal";

function CreateContent({ itemId }) {
  const [data, setData] = useState([]);
  const [resources, setResources] = useState([]);
  const [interests, setInterests] = useState([]);
  const [hostRequests, setHostRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${USER_DOMAIN}/users`);
      const reversedData = res.data.data.reverse(); // Reverse the data
      setData(reversedData);
      console.log(reversedData);

      const interestsRes = await axios.get(
        `${BASE_URL}${USER_DOMAIN}/interests`
      );
      setInterests(interestsRes.data.data);

      const resData = await axios.get(`${BASE_URL}${USER_DOMAIN}/resources`);
      setResources(resData.data.data);

      const hostData = await axios.get(`${BASE_URL}${USER_DOMAIN}/hosts`);
      setHostRequests(hostData.data.data);

      console.log(hostData);
      //console.log(res.data.data)
    } catch (error) {
      setError(error);
    }
  };

  const handleDelete = async (me) => {
    try {
      let auser = { id: me };
      console.log(auser);
      const response = await axios.post(
        `${BASE_URL}${USER_DOMAIN}/delete`,
        auser
      );
      if (response.status === 200) {
        fetchData();
        alert("User Deleted");
        console.log("Data deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  const sortedUsers = [...data].sort(
    (a, b) => new Date(b.time_created) - new Date(a.time_created)
  );


  return (
    <>
      <div
        class="modal fade"
        id="contenttModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <CreateContentModal />
      </div>
      <div className="w-100 container-fluid bg-light pt-4">
        <div className="d-sm-flex justify-content-between mb-4">
          <h1 className="h2 mb-0 dashboard text-dark">Dashboard</h1>
          <div className="d-flex flex-column flex-sm-row">
            <div
              style={{ marginTop: 10 + "px" }}
              className="create-content order-sm-1"
            >
              <button
                className="dropdown-item"
                data-toggle="modal"
                data-target="#contenttModal"
              >
                Create Content{" "}
                <span>
                  <i class="bi bi-plus"></i>
                </span>
              </button>
            </div>
            {/* <div
              style={{ marginTop: 10 + "px", paddingLeft: 20 + "px" }}
              className="broadcast-btn order-sm-2"
            >
              <button
                className="dropdown-item"
                data-toggle="modal"
                data-target="#Broadcast"
              >
                Broadcast Messages to All
              </button>
            </div> */}
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card cards  h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-1">
                    <div className="text-xs text-secondary mb-1 text-lights">
                      Audio files
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-dark">
                      {resources.length}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card cards h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-1">
                    <div className="text-xs text-secondary mb-1  text-lights">
                      Users
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-dark">
                      {sortedUsers.length}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card cards h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-1">
                    <div className="text-xs text-secondary mb-1  text-lights">
                      Host request
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-dark">
                      {hostRequests.length}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card cards h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-1">
                    <div className="text-xs text-secondary mb-1  text-lights">
                      Avg. time on app
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-dark">
                      00:00
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">


          <div className="col-xl-8 col-lg-7">
            <div className="card mb-4">

              <div
                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold col-black">User Overview</h6>
                <div className="">
                  <select name="" id="" className="select">
                    <option value="">Today</option>
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <canvas id="myAreaChart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <div className="card mb-4">
              <div
                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold col-black">Generate coupon</h6>
                <button className="reload-btn">Reload</button>
              </div>
              <div className="card-body">
                <div className="chart-pie pt-4 pb-2">
                  <canvas id="myPieChart"></canvas>
                </div>
                <div className="mt-4 d-flex justify-content-center">
                  <div className="coupon-code text-center ">
                    <p className="pt-3">32u1002311 |<span className="pl-2 text-warning"> Copy</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="card mb-4">
              <div className="card-header py-3 flex-row">
                <h6 className="m-0 font-weight-bold text-dark">
                  All Users ({sortedUsers.length})
                </h6>
              </div>
              <div className="all-users-scroll">
                <Search />
                <div className="container  pb-4">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>USER</th>
                          <th>EMAIL</th>
                          <th>MOOD</th>
                          <th>PERCENTAGE</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedUsers.slice(0, 6).map((user) => (
                          <tr key={user.id}>
                            <th scope="row ">
                              {/* <span><img src={user.image} alt="" className="userImage" /></span> */}
                              <span className=" text-dark ">
                                {user.username}{" "}
                              </span>
                            </th>
                            <td className=" text-dark">{user.email}</td>
                            <td>
                              {user.mood === "Happy" ? (
                                <label className="badge-pill badge-success mt-3">
                                  HAPPY
                                </label>
                              ) : (
                                <></>
                              )}
                              {user.mood === "Sad" ? (
                                <label className="badge-pill badge-dark mt-3">
                                  SAD
                                </label>
                              ) : (
                                <></>
                              )}
                              {user.mood === "Angry" ? (
                                <label className="badge-pill badge-danger mt-3">
                                  ANGRY
                                </label>
                              ) : (
                                <></>
                              )}
                            </td>
                            <td>{user.percentage}</td>
                            <td>
                              <li className="nav-item dropdown no-arrow">
                                <a
                                  className="nav-link dropdown-toggle"
                                  href="#"
                                  id="userDropdown"
                                  role="button"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bi bi-three-dots-vertical"></i>
                                </a>
                                <div
                                  className="dropdown-menu dropdown-menu-left animated--grow-in"
                                  aria-labelledby="userDropdown"
                                >
                                  <a className="dropdown-item" href="#">
                                    Make a host
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Edit Profile
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Send Message
                                  </a>
                                  <a
                                    className="dropdown-item text-danger"
                                    href="#"
                                    data-toggle="modal"
                                    data-target=""
                                    onClick={() => handleDelete(user._id)}
                                  >
                                    Delete Profile
                                  </a>
                                </div>
                              </li>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* {data.length > 6 && (
                    <button className="btn btn-primary  w-30" onClick={handleSeeMoreClick}>
                      {showAll ? 'Show Less' : 'See More'}
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <div className="card mb-4">
              <div className="card-header py-3 flex-row align-items-center">
                <h6 className="m-0 font-weight-bold text-dark">
                  Become a host requests
                </h6>
              </div>
              <div className="card-body">
                {hostRequests.map((host) => (
                  <div className="Profile-image d-flex justify-content-between border-bottom">
                    <div className="d-flex">
                      <img src={host.image} alt="" className="profileImage" />
                      <div className="Profile-details">
                        <li>
                          {host.firstName} <span>{host.lastName}</span>{" "}
                        </li>
                        <li>141 mutual friends</li>
                      </div>
                    </div>
                    <div>
                      <li className="nav-item dropdown no-arrow">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="userDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-left animated--grow-in"
                          aria-labelledby="userDropdown"
                        >
                          <a className="dropdown-item" href="#">
                            Approve
                          </a>
                          <a
                            className="dropdown-item text-danger"
                            href="#"
                            data-toggle="modal"
                            data-target=""
                          >
                            Decline
                          </a>
                        </div>
                      </li>
                    </div>
                  </div>
                ))}

                {/* <div className="Profile-image d-flex justify-content-between border-bottom">
                  <div className="d-flex">
                    <img src={profileImageOne} alt="" className='profileImage' />
                    <div className="Profile-details">
                      <li>Laquita Elliott</li>
                      <li>141 mutual friends</li>
                    </div>
                  </div>
                  <div>
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                          Approve
                        </a>
                        <a className="dropdown-item text-danger" href="#" data-toggle="modal"
                          data-target="">
                          Decline
                        </a>

                      </div>
                    </li>
                  </div>
                </div>
                <div className="Profile-image d-flex justify-content-between border-bottom">
                  <div className="d-flex">
                    <img src={profileImageOne} alt="" className='profileImage' />
                    <div className="Profile-details">
                      <li>Laquita Elliott</li>
                      <li>141 mutual friends</li>
                    </div>
                  </div>
                  <div>
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                          Approve
                        </a>
                        <a className="dropdown-item text-danger" href="#" data-toggle="modal"
                          data-target="">
                          Decline
                        </a>

                      </div>
                    </li>
                  </div>
                </div>
                <div className="Profile-image d-flex justify-content-between border-bottom">
                  <div className="d-flex">
                    <img src={profileImageOne} alt="" className='profileImage' />
                    <div className="Profile-details">
                      <li>Laquita Elliott</li>
                      <li>141 mutual friends</li>
                    </div>
                  </div>
                  <div>
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                          Approve
                        </a>
                        <a className="dropdown-item text-danger" href="#" data-toggle="modal"
                          data-target="">
                          Decline
                        </a>

                      </div>
                    </li>
                  </div>
                </div>
                <div className="Profile-image d-flex justify-content-between border-bottom">
                  <div className="d-flex">
                    <img src={profileImageOne} alt="" className='profileImage' />
                    <div className="Profile-details">
                      <li>Laquita Elliott</li>
                      <li>141 mutual friends</li>
                    </div>
                  </div>
                  <div>
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                          Approve
                        </a>
                        <a className="dropdown-item text-danger" href="#" data-toggle="modal"
                          data-target="">
                          Decline
                        </a>

                      </div>
                    </li>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* <singleHost/> */}
        {/* <div className="container card pb-4">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">SOURCE</th>
                  <th scope="col">PAGE VIEWS</th>
                  <th scope="col">CHANGE</th>
                  <th scope="col">DURATION</th>
                  <th scope="col">BOUNCE</th>
                  <th scope="col">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><span><img src={facebook} alt="" className="socialImage" /></span> Facebook</th>
                  <td>12,5564</td>
                  <td>
                    <button className="change-btn-green">+65.31%</button>
                  </td>
                  <td>00:08:10</td>
                  <td>21.32%</td>
                  <td>
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                          Approve
                        </a>
                        <a className="dropdown-item" href="#">
                          Send feedback
                        </a>
                        <a className="dropdown-item text-danger" href="#" data-toggle="modal"
                          data-target="">
                          Decline
                        </a>
                      </div>
                    </li>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span><img src={medium} alt="" className="socialImage" /></span>Medium</th>
                  <td>9,567</td>
                  <td>
                    <button className="change-btn-green">+65.31%</button>
                  </td>
                  <td>00:08:10</td>
                  <td>21.32%</td>
                  <td>
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                          Approve
                        </a>
                        <a className="dropdown-item" href="#">
                          Send feedback
                        </a>
                        <a className="dropdown-item text-danger" href="#" data-toggle="modal"
                          data-target="">
                          Decline
                        </a>
                      </div>
                    </li>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span><img src={google} alt="" className="socialImage" /></span>Google</th>
                  <td>5,440</td>
                  <td>
                    <button className="change-btn-red">+65.31%</button>
                  </td>
                  <td>00:08:10</td>
                  <td>21.32%</td>
                  <td>
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                          Approve
                        </a>
                        <a className="dropdown-item" href="#">
                          Send feedback
                        </a>
                        <a className="dropdown-item text-danger" href="#" data-toggle="modal"
                          data-target="">
                          Decline
                        </a>
                      </div>
                    </li>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span><img src={youtube} alt="" className="socialImage" /></span>Youtube</th>
                  <td>2,767</td>
                  <td>
                    <button className="change-btn-green">+65.31%</button>
                  </td>
                  <td>00:08:10</td>
                  <td>21.32%</td>
                  <td>
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                          Approve
                        </a>
                        <a className="dropdown-item" href="#">
                          Send feedback
                        </a>
                        <a className="dropdown-item text-danger" href="#" data-toggle="modal"
                          data-target="">
                          Decline
                        </a>
                      </div>
                    </li>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span><img src={bing} alt="" className="socialImage" /></span>Bing</th>
                  <td>1,443</td>
                  <td>
                    <button className="change-btn-red">+65.31%</button>
                  </td>
                  <td>00:08:10</td>
                  <td>21.32%</td>
                  <td>
                    <li className="nav-item dropdown no-arrow">
                      <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bi bi-three-dots-vertical"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                          Approve
                        </a>
                        <a className="dropdown-item" href="#">
                          Send feedback
                        </a>
                        <a className="dropdown-item text-danger" href="#" data-toggle="modal"
                          data-target="">
                          Decline
                        </a>
                      </div>
                    </li>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-center view-more-social-track text-primary">See all data <ArrowRightShort /></p>
          </div>
        </div> */}

        <Resource />
      </div>
      <div
        class="modal fade"
        id="Broadcast"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                class="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="container modal-body">
              <div class="all-users">
                <p>
                  All users <span class="total-users">49</span>
                </p>
              </div>
              <div class="modal-img-row">
                <img src={profileImageOne} alt="" />
                <img src={profileImageOne} alt="" />
                <img src={profileImageOne} alt="" />
                <img src={profileImageOne} alt="" />
                <img src={profileImageOne} alt="" />
                <img src={profileImageOne} alt="" />
              </div>
              <div class="modal-broadcast">
                <p>Send message</p>
                <textarea
                  name=""
                  id=""
                  placeholder="Write description, this will show in users push notifications"
                ></textarea>
                <p>0/1000</p>
                <button class="modal-broadcast-btn">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateContent;
