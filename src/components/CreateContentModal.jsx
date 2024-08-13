import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, USER_DOMAIN } from '../utils/config'
// import singleHost from './SingelHost';
import Resource from './Resource'
import { Cloudinary } from '@cloudinary/url-gen'
import Search from './Search'
import { event } from 'jquery'
import { useNavigate } from 'react-router-dom'

function CreateContent ({ editData }) {
  const [data, setData] = useState([])
  const [resources, setResources] = useState([])
  const [interests, setInterests] = useState([])
  const [hostRequests, setHostRequests] = useState([])
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [duration, setDuration] = useState(null)
  const [mood, setMood] = useState(null)
  const [loadingCreation, setLoadingCreation] = useState(false)

  const [title, setTitle] = useState('')
  const [descp, setDescp] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [playNo, setPlayNo] = useState(0)
  const [interestID, setInterestID] = useState('')
  const [userID, setUserID] = useState('')
  const navigate = useNavigate('')

  const uploadImage = async uploadImg => {
    const data = new FormData()
    data.append('file', uploadImg)
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
    data.append('folder', 'Cloudinary-React')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: 'POST',
          body: data
        }
      )
      const res = await response.json()
    

      return res.secure_url
    } catch (error) {
      return null
    }
  }

  useEffect(() => {
    fetchData()
    if (editData != null) {
      assignFieldValues()
    } 
  }, [editData])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${USER_DOMAIN}/users`)
      const reversedData = res.data.data.reverse() // Reverse the data
      setData(reversedData)
      console.log(reversedData)

      const interestsRes = await axios.get(
        `${BASE_URL}${USER_DOMAIN}/interests`
      )
      setInterests(interestsRes.data.data)

      const resData = await axios.get(`${BASE_URL}${USER_DOMAIN}/resources`)
      setResources(resData.data.data)

      const hostData = await axios.get(`${BASE_URL}${USER_DOMAIN}/hosts`)
      setHostRequests(hostData.data.data)

      console.log(hostData)
      //console.log(res.data.data)
    } catch (error) {
      setError(error)
    }
  }

  const sortedUsers = [...data].sort(
    (a, b) => new Date(b.time_created) - new Date(a.time_created)
  )
  // const dataToShow = showAll ? sortedUsers : data.slice(0, 6);

  // const handleSeeMoreClick = () => {
  //   setShowAll(!showAll);
  // };
  const handleFileSelected = event => {
    setImage(URL.createObjectURL(event.target.files[0]))
    setImageFile(event.target.files[0])
  }

  const handleAudioSelected = event => {
    console.log(event.target.files[0])
    setAudioFile(event.target.files[0])

    let file = URL.createObjectURL(event.target.files[0])
    console.log(file)
  }

  const saveContent = async event => {
    event.preventDefault()
    if (imageFile == null || audioFile == null) {
      alert('Please select your image and audio file')
    } else {
      setLoadingCreation(true)
      let imageURL = await uploadImage(imageFile)
      let audioURL = await uploadImage(audioFile)

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
          paymentType:paymentType,
          
        }
        console.log(resourceData)
        await axios.post(`${BASE_URL}${USER_DOMAIN}/resources`, resourceData)
        fetchData()
        setLoadingCreation(false)
        alert('Content Uploaded Successfully')
        navigate('/admin/contentPage')
      } else {
        alert('Image or Audio encountered error during upload')
      }
    }
  }

  const updateContent = async event => {
    event.preventDefault()
    setLoadingCreation(true)
    let resourceData = {
      title: title,
      description: descp,
      userID: userID,
      duration: duration,
      moodType: mood,
      interestID: interestID
    }
    if (imageFile != null) {
      let imageURL = await uploadImage(imageFile)
      resourceData.image = imageURL
    }
    if (audioFile != null) {
      let audioURL = await uploadImage(audioFile)
      resourceData.resourceUrl = audioURL
    }
    console.log(resourceData)
    await axios.put(`${BASE_URL}${USER_DOMAIN}/resources/`+editData._id, resourceData)
    fetchData()
    setLoadingCreation(false)
    if(window.confirm(`${title} Updated Successfully, do you want to relaod this page?`)){
      window.location.reload()
    }
   

   
  }

  const handleFormChange = event => {
    if (event.target.name === 'title') {
      setTitle(event.target.value)
    }

    if (event.target.name === 'descp') {
      setDescp(event.target.value)
    }

    if (event.target.name === 'interest') {
      setInterestID(event.target.value)
    }

    if (event.target.name === 'userID') {
      setUserID(event.target.value)
    }

    if (event.target.name === 'mood') {
      setMood(event.target.value)
    }

    if (event.target.name === 'duration') {
      setDuration(event.target.value)
    }
    if (event.target.name === 'paymentType') {
      setPaymentType(event.target.value)
    }
  }

  const assignFieldValues = () => {
    setTitle(editData.title)
    setDescp(editData.description)
    setDuration(editData.duration)
    setUserID(editData.userID)
    setInterestID(editData.interestID)
    setMood(editData.moodType)
    setImage(editData.image)
    setPaymentType(editData.paymentType)
    console.log(editData)
  }

  return (
    <div>
      <div className='CreateContent'>
        <div class='modal-dialog' role='document'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h4 class='text-dark'>
                {' '}
                {editData == null ? <>Create Content</> : <>Update Content</>}
              </h4>
              <button
                class='close'
                type='button'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div class='container modal-body'>
              <form
                action=''
                onSubmit={editData == null ? saveContent : updateContent}
              >
                <div>
                  <div></div>
                  <div>
                    <p>cover image</p>
                    <div>
                      {image != null ? (
                        <img src={image} alt='' className='uploadImg' />
                      ) : (
                        <></>
                      )}
                      <div>
                        <label for='input-file' class='img-cover'>
                          <div>
                            <span class='text-primary'>click to upload</span>
                          </div>
                        </label>
                      </div>
                      <input
                        type='file'
                        id='input-file'
                        class='hidden'
                        onChange={handleFileSelected}
                        accept='image/png, image/gif, image/jpeg'
                      />
                    </div>
                    <div class='pt-4'>
                      <p>Title</p>
                      <div class='title'>
                        <input
                          type='text'
                          name='title'
                          id='title'
                          value={title}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    <div class='pt-4'>
                      <p>Description</p>
                      <div class='description'>
                        <textarea
                          name='descp'
                          id=''
                          className='form-control'
                          value={descp}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                    </div>
                    <p>Duration</p>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div class=''>
                          <div class='title'>
                            <input
                              type='text'
                              name='duration'
                              value={duration}
                              onChange={handleFormChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div class=' modal-select'>
                          <select
                            name='interest'
                            id=''
                            class='select-modal'
                            onChange={handleFormChange}
                          >
                            <option value=''>Select Interest</option>
                            {interests.map(data => {
                              return (
                                <>
                                  {interestID === data._id ? (
                                    <option value={data._id} selected>
                                      {' '}
                                      {data.name}
                                    </option>
                                  ) : (
                                    <option value={data._id}>
                                      {' '}
                                      {data.name}
                                    </option>
                                  )}
                                </>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div class='pt-4 modal-select'>
                          <select
                            name='userID'
                            id=''
                            class='select-modal'
                            onChange={handleFormChange}
                          >
                            <option value=''>Select User</option>
                            {sortedUsers.map(user => {
                              return (
                                <>
                                  {userID === user._id ? (
                                    <option value={user._id} selected>
                                      {' '}
                                      {user.email}
                                    </option>
                                  ) : (
                                    <option value={user._id}>
                                      {' '}
                                      {user.email}
                                    </option>
                                  )}
                                </>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div class='pt-4 modal-select'>
                          <select
                            name='mood'
                            id='mood'
                            class='select-modal'
                            onChange={handleFormChange}
                          >
                            <option value=''>Select Mood</option>
                            {mood === 'happy' ? (
                              <option value='happy' selected>
                                HAPPY
                              </option>
                            ) : (
                              <option value='happy'>HAPPY</option>
                            )}
                            {mood === 'sad' ? (
                              <option value='sad' selected>
                                SAD
                              </option>
                            ) : (
                              <option value='sad'>SAD</option>
                            )}
                            {mood === 'angry' ? (
                              <option value='angry' selected>
                                ANGRY
                              </option>
                            ) : (
                              <option value='angry'>ANGRY</option>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class='pt-4'>
                      <p>Upload file (audio mp3 format)</p>
                      <div>
                        <div>
                          <label for='input-file1' class='audio-cover'>
                            {' '}
                            {audioFile == null ? (
                              <>
                                <span class='text-primary'>
                                  {' '}
                                  click to upload
                                </span>{' '}
                                or drag and drop
                              </>
                            ) : (
                              <>{audioFile.name}</>
                            )}{' '}
                          </label>
                        </div>
                        <input
                          type='file'
                          id='input-file1'
                          class='hidden'
                          onChange={handleAudioSelected}
                          accept='audio/mp3'
                        />
                      </div>
                    </div>
                    <div class='modal-create-content'>
                      <button type='submit' className='broadcast-btn'>
                        {loadingCreation ? (
                          <>Uploading Data...</>
                        ) : (
                          <>{editData == null ? <>Create Content</> : <>Update Content</>}</>
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
  )
}

export default CreateContent
