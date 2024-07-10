// import React, { useEffect, useState } from 'react';
import Resource from "./Resource";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, USER_DOMAIN } from "../utils/config";
import CreateContentModal from "./CreateContentModal";

function Content() {
  const [resources, setResources] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${USER_DOMAIN}/resources`);
      const reversedData = res.data.data.reverse(); // Reverse the data
      setResources(reversedData);
    } catch (error) {
      console.error("Error fetching resources:", error.message);
    }
  };

  const handleDeleteResource = async (me) => {
    try {
      let auser = { id: me };
      console.log(auser);
      const response = await axios.post(
        `${BASE_URL}${USER_DOMAIN}/resources/delete`,
        auser
      );
      if (response.status === 200) {
        fetchResources();
        alert("Content Deleted");
        console.log("Data deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  const formatTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  return (
    <div className="">
        <div
        class="modal fade"
        id="contentEdittModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <CreateContentModal />
      </div>
      <div className="container">
        <div className=" card pb-4 pt-3">
          <div className="card-header pb-4 flex-row">
            <h6 className="m-0 font-weight-bold text-dark">
              All Content ({resources.length})
            </h6>
          </div>
          <div className="container">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">IMAGE</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">MOOD TYPE</th>
                    <th scope="col">DURATION</th>
                    <th scope="col">TIME CREATED</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource, index) => {
                    return (
                      <tr key={resource._id}>
                        <th scope="row">
                          <span>
                            <img
                              src={resource.image}
                              alt=""
                              className="socialImage"
                            />
                          </span>{" "}
                        </th>
                        <td>{resource.title}</td>
                        <td>
                          {resource.moodType === "happy" ? (
                            <label className="badge-pill badge-success mt-3">
                              HAPPY
                            </label>
                          ) : (
                            <></>
                          )}
                          {resource.moodType === "sad" ? (
                            <label className="badge-pill badge-dark mt-3">
                              SAD{" "}
                            </label>
                          ) : (
                            <></>
                          )}
                          {resource.moodType === "angry" ? (
                            <label className="badge-pill badge-danger mt-3">
                              ANGRY
                            </label>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>{resource.duration}</td>
                        <td>{formatTimestampToDate(resource.time_created)}</td>
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
                              <a 
                              className="dropdown-item"
                               href="#"
                               data-toggle="modal"
                               data-target="#contentEdittModal"
                               >
                                Edit
                              </a>
                              <a
                                className="dropdown-item text-danger"
                                href="#"
                                data-toggle="modal"
                                data-target=""
                                onClick={() =>
                                  handleDeleteResource(resource._id)
                                }
                              >
                                Delete
                              </a>
                            </div>
                          </li>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
