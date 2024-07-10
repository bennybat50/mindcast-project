import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, USER_DOMAIN } from "../utils/config";
// import singleHost from './SingelHost';
import Resource from "./Resource";
import { Cloudinary } from "@cloudinary/url-gen";
import Search from "./Search";
function CreateContent() {
  const [data, setData] = useState([]);
  const [resources, setResources] = useState([]);
  const [interests, setInterests] = useState([]);
  const [hostRequests, setHostRequests] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState(null);
  const [mood, setMood] = useState(null);
  const [loadingCreation, setLoadingCreation] = useState(false);

  const [title, setTitle] = useState("");
  const [descp, setDescp] = useState("");
  const [interestID, setInterestID] = useState("");
  const [userID, setUserID] = useState("");

  const uploadImage = async (uploadImg) => {
    const data = new FormData();
    data.append("file", uploadImg);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      //  console.log(res);

      return res.secure_url;
    } catch (error) {
      return null;
    }
  };

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
  // const dataToShow = showAll ? sortedUsers : data.slice(0, 6);

  // const handleSeeMoreClick = () => {
  //   setShowAll(!showAll);
  // };
  const handleFileSelected = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setImageFile(event.target.files[0]);
  };

  const handleAudioSelected = (event) => {
    console.log(event.target.files[0]);
    setAudioFile(event.target.files[0]);

    let file = URL.createObjectURL(event.target.files[0]);
    console.log(file);
  };

  const saveContent = async (event) => {
    event.preventDefault();
    if (imageFile == null || audioFile == null) {
      alert("Please select your image and audio file");
    } else {
      setLoadingCreation(true);
      let imageURL = await uploadImage(imageFile);
      let audioURL = await uploadImage(audioFile);

      if (imageURL != null && audioURL != null) {
        let resourceData = {
          title: title,
          description: descp,
          image: imageURL,
          userID: userID,
          duration: duration,
          moodType: mood,
          interestID: interestID,
          resourceUrl: audioURL,
        };
        console.log(resourceData);
        await axios.post(`${BASE_URL}${USER_DOMAIN}/resources`, resourceData);
        fetchData();
        setLoadingCreation(false);
        alert("Content Uploaded Successfully");
      } else {
        alert("Image or Audio encountered error during upload");
      }
    }
  };

  const handleFormChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    }

    if (event.target.name === "descp") {
      setDescp(event.target.value);
    }

    if (event.target.name === "interest") {
      setInterestID(event.target.value);
    }

    if (event.target.name === "userID") {
      setUserID(event.target.value);
    }

    if (event.target.name === "mood") {
      setMood(event.target.value);
    }

    if (event.target.name === "duration") {
      setDuration(event.target.value);
    }
  };

  return (
    <div>
      <div className="CreateContent">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="text-dark">Create Content</h4>
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
              <form action="" onSubmit={saveContent}>
                <div>
                  <div></div>
                  <div>
                    <p>cover image</p>
                    <div>
                      {image != null ? (
                        <img src={image} alt="" className="uploadImg" />
                      ) : (
                        <></>
                      )}
                      <div>
                        <label for="input-file" class="img-cover">
                          <div>
                            <span class="text-primary">click to upload</span>
                          </div>
                        </label>
                      </div>
                      <input
                        type="file"
                        id="input-file"
                        class="hidden"
                        onChange={handleFileSelected}
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>
                    <div class="pt-4">
                      <p>Title</p>
                      <div class="title">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    <div class="pt-4">
                      <p>Description</p>
                      <div class="description">
                        <textarea
                          name="descp"
                          id=""
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                    </div>
                    <p>Duration</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div class="">
                          <div class="title">
                            <input
                              type="text"
                              name="duration"
                              onChange={handleFormChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class=" modal-select">
                          <select
                            name="interest"
                            id=""
                            class="select-modal"
                            onChange={handleFormChange}
                          >
                            <option value="">Select Interest</option>
                            {interests.map((data) => {
                              return (
                                <option value={data._id}> {data.name}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div class="pt-4 modal-select">
                          <select
                            name="userID"
                            id=""
                            class="select-modal"
                            onChange={handleFormChange}
                          >
                            <option value="">Select User</option>
                            {sortedUsers.map((user) => {
                              return (
                                <option value={user._id}> {user.email}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="pt-4 modal-select">
                          <select
                            name="mood"
                            id="mood"
                            class="select-modal"
                            onChange={handleFormChange}
                          >
                            <option value="">Select Mood</option>
                            <option value="happy">HAPPY</option>
                            <option value="sad">SAD</option>
                            <option value="angry">ANGRY</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="pt-4">
                      <p>Upload file (audio mp3 format)</p>
                      <div>
                        <div>
                          <label for="input-file1" class="audio-cover">
                            {" "}
                            {audioFile == null ? (
                              <>
                                <span class="text-primary">
                                  {" "}
                                  click to upload
                                </span>{" "}
                                or drag and drop
                              </>
                            ) : (
                              <>{audioFile.name}</>
                            )}{" "}
                          </label>
                        </div>
                        <input
                          type="file"
                          id="input-file1"
                          class="hidden"
                          onChange={handleAudioSelected}
                          accept="audio/mp3"
                        />
                      </div>
                    </div>
                    <div class="modal-create-content">
                      <button type="submit" className="broadcast-btn">
                        {loadingCreation ? (
                          <>Uploading Data...</>
                        ) : (
                          <>Create Content</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateContent;
