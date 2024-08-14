import { useState, useEffect } from 'react'
import { BASE_URL, USER_DOMAIN } from '../utils/config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Search from './Search'

function ManageApp () {
  const [messageData, setMessageData] = useState({})
  const [androidData, setAndroidData] = useState({})
  const [iosData, setIosData] = useState({})
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [savingData, setSavingData] = useState(false)
  const navigate = useNavigate('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [device, setDevice] = useState('')
  const [vcode, setVcode] = useState('')
  const [vname, setVname] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      
      const messageRes = await axios.get(
        `${BASE_URL}${USER_DOMAIN}/app-message`
      )
     
     
     

      const androidRes = await axios.get(
        `${BASE_URL}${USER_DOMAIN}/app-version?os=android`
      )
      setAndroidData(androidRes.data.data)

      const iosRes = await axios.get(
        `${BASE_URL}${USER_DOMAIN}/app-version?os=ios`
      )
      console.log(iosRes.data.data);
      setIosData(iosRes.data.data)
      

      updateValues()

      if(messageRes.data.data.title!=null){
        setMessageData(messageRes.data.data)
        updateValues()
      }

      //console.log(res.data.data)
    } catch (error) {
      setError(error)
    }
  }

  const handleDelete = async interestId => {
    try {
      if (
        window.confirm(
          'Are you sure you want to delete interest, most content would be lost to it'
        )
      ) {
        const response = await axios.post(
          `${BASE_URL}${USER_DOMAIN}/interest/delete`,
          { id: interestId }
        )

        if (response.status === 200) {
          fetchData()
          alert('User interests deleted')
          console.log('interests deleted successfully')
        }
      }
    } catch (error) {
      console.error('Error deleting data:', error.message)
    }
  }

  const updateMessage = async () => {

    let sendData={title:title, message:message,status:status}
    if (imageFile != null) {
      let imageURL = await uploadImage(imageFile)
      sendData.image = imageURL
    }
    const response = await axios.post(`${BASE_URL}${USER_DOMAIN}/app-message`, sendData)
    if(response.status===200){
      fetchData()
      alert("Message Broadcasted")
    }
    
  }


  const deleteMessage = async () => {

    if(window.confirm("Are you sure you want to stop this message")){
      let sendData={id:messageData._id}
      console.log(sendData);
         
        const response = await axios.post(`${BASE_URL}${USER_DOMAIN}/app-message/delete`, sendData)
        if(response.status===200){
          fetchData()
          alert("Message Deleted")
        }
    }
    
  }


  const updateApps = async () => {

    if(window.confirm(`Are you sure you want to update `+device)){
      let sendData={"device":device,"v_code":vcode, "v_name":vname}
      console.log(sendData);
         
        const response = await axios.post(`${BASE_URL}${USER_DOMAIN}/app-version`, sendData)
        if(response.status===200){
          fetchData()
          alert(`${device} App Updated`)
        }
    }
    
  }


  const handleFormChange = event => {
    if (event.target.name === 'title') {
      setTitle(event.target.value)
    }

    if (event.target.name === 'message') {
      setMessage(event.target.value)
    }

    if (event.target.name === 'status') {
      setStatus(event.target.value)
      
    }

    if (event.target.name === 'device') {
     
      setDevice(event.target.value)
      if(event.target.value==="android"){
        setVcode(androidData.v_code)
        setVname(androidData.v_name)
      }else if(event.target.value==="ios"){
        setVcode(iosData.v_code)
        setVname(iosData.v_name)
      }
    }

    if (event.target.name === 'v_code') {
      setVcode(event.target.value)
    }

    if (event.target.name === 'v_name') {
      setVname(event.target.value)
    }
  }

  const handleFileSelected = event => {
    setImage(URL.createObjectURL(event.target.files[0]))
    setImageFile(event.target.files[0])
  }

  const updateValues = ()=>{
    setTitle(messageData.title)
    setMessage(messageData.message)
    setImage(messageData.image)
    setStatus(messageData.status)
    
  }

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

  return (
    <>
      <div className='w-100 container-fluid bg-light pt-4'>
        <div className='d-sm-flex justify-content-between mb-4'>
          <h1 className='h2 mb-0  text-dark'>Manage App</h1>
           
        </div>
      </div>

      <div className='w-100 container-fluid bg-light pt-4'>
        <div className=' w-100 '>
          <div className='card mb-4'>
            <div className=''>
              <Search />
              <div className='container  p-4 '>
               
                <div className='row'>
                  <div className='col-md-5'>

                   {messageData?<></>: <div className="border border-2">
                      <div className="row">
                        <div className="col-md-4">
                        <img src={messageData.image} alt="" style={{ height:"200px", width:"100px", objectFit:"cover" }} />
                        </div>
                        <div className="col-md-8">
                          <ul>
                            <li><h4>{messageData.title}</h4></li>
                            <li><p>{messageData.message}</p></li>
                            <li>{messageData.status}</li>
                          </ul>
                        </div>
                      </div>
                    </div>}

                    <div className="border border-2 m-4 p-4">
                    <br />
                  <h4>App Message</h4>
                    <br />
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
                    <div className='row'>
                      <div className='col-md-6'>
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
                      </div>
                      <div className='col-md-6'>
                        <div class='pt-4 modal-select'>
                          <p>Status</p>
                          <select
                            name='status'
                            id='status'
                            class='select-modal'
                            onChange={handleFormChange}
                          >
                            <option value=''>Select Status</option>
                            {status === 'active' ? (
                              <option value='active' selected>
                                ACTIVE
                              </option>
                            ) : (
                              <option value='active'>ACTIVE</option>
                            )}

                            {status === 'inactive' ? (
                              <option value='inactive' selected>
                                IN-ACTIVE
                              </option>
                            ) : (
                              <option value='inactive'>IN-ACTIVE</option>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class='pt-4'>
                      <p>Message</p>
                      <div class=''>
                        <textarea
                          name='message'
                          id=''
                          className='form-control'
                          value={message}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                    </div>
                    <br />
                   <div className="d-flex justify-content-between">
                   <button type="button"  onClick={()=>updateMessage()} className='btn btn-primary' >Update</button>
                   {messageData?<></>:<button type="button"  onClick={()=>deleteMessage()} className='btn btn-danger' >Delete</button>}

                   </div>

                    <br />
                    <br />
                    </div>
                  </div>
                  <div className='col-md-6 '>
                    
                    <div className="border border-2 m-1 ">
                                        <br />
                  <h4 className='px-4'>App Versions</h4>
                    
                  <div className="row">
                    <div className="col-md-6">
                    <ul>
                    <hr />
                    <li><h4><b>Android</b></h4></li>
                    <hr />
                    <li>Version Name: <b>{androidData.v_name}</b></li>
                    <li>Version Code: <b>{androidData.v_code}</b></li>
                    <li>Last Update: <b>{new Date(androidData.updated_at).toLocaleDateString("en-US")}</b></li>
                   </ul> 
                    </div>
                    <div className="col-md-6">
                    <ul>
                      <hr />
                      <li><h4><b>IOS</b></h4></li>
                      <hr />
                        <li>Version Name: <b>{iosData.v_name}</b></li>
                        <li>Version Code: <b>{iosData.v_code}</b></li>
                        <li>Last Update: <b>{new Date(iosData.updated_at).toLocaleDateString("en-US")}</b></li>
                   </ul>
                    </div>
                  </div>

                  <hr />
                  <div className="p-3">
                  <h4>Update App Form</h4>
                  <hr />
                  <div className='row'>
                      <div className='col-md-3'>
                        <div class='pt-4'>
                          <p>V-CODE</p>
                          <div class='title'>
                            <input
                              type='text'
                              name='v_code'
                              id='v_code'
                              value={vcode}
                              onChange={handleFormChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-3'>
                        <div class='pt-4'>
                          <p>V-NAME</p>
                          <div class='title'>
                            <input
                              type='text'
                              name='v_name'
                              id='v_name'
                              value={vname}
                              onChange={handleFormChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-3'>
                        <div class='pt-4 modal-select'>
                          <p>Device</p>
                          <select
                            name='device'
                            id='device'
                            class='select-modal'
                            onChange={handleFormChange}
                          >
                            <option value=''>Select Device</option>
                            <option value='android' > Android </option>
                            <option value='ios' > IOS </option> 
                          </select>
                        </div>
                      </div>
                      <div className='col-md-3'>
                        <div class='pt-4'>
                         <br />
                         <button className="btn btn-primary" onClick={()=>updateApps()}>Update</button>
                        </div>
                      </div>
                      

                  </div>
                  </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageApp
