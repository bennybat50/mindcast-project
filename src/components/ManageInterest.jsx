import { useState, useEffect } from 'react'
import { BASE_URL, USER_DOMAIN } from '../utils/config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Search from './Search'



function ManageInterest () {
  const [interests, setInterests] = useState([])
  const [interestName, setInterestName] = useState([])
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [savingData, setSavingData] = useState(false)
  const [position, setPosition] = useState()
 
  const navigate = useNavigate('')
  useEffect(() => {
    fetchData()
     
  }, [])

  const fetchData = async () => {
    try {
      const interestsRes = await axios.get(
        `${BASE_URL}${USER_DOMAIN}/interests`
      )
      setInterests(interestsRes.data.data)
      setPosition(interests.length+1)
      //console.log(res.data.data)
    } catch (error) {
      setError(error)
    }
  }

  const handleDelete = async (interestId) => {
    try {
      if(window.confirm("Are you sure you want to delete interest, most content would be lost to it")){
 
      const response = await axios.post(`${BASE_URL}${USER_DOMAIN}/interest/delete`,{ id: interestId })
 
      if (response.status === 200) {
        fetchData();
        alert('User interests deleted')
        console.log('interests deleted successfully')
      }
      }
    } catch (error) {
      console.error('Error deleting data:', error.message)
    }
  }

  const postIntrest = async event => {
    event.preventDefault()
    setSavingData(true)
    try {
      if (imageFile == null) {
        alert('Please select interest image file')
      } else {
        let imageURL = await uploadImage(imageFile)
        let resourceData = {
          name: interestName,
          icon: imageURL,
          position:position
        }

        const res = await axios.post(
          `${BASE_URL}${USER_DOMAIN}/interest`,
          resourceData
        )
        fetchData()
        setSavingData(false)
        // if (res) navigate('/createInterest')
      }
    } catch (error) {
      setError(error)
    }
  }

  const handleFormChange = event => {
    if (event.target.name === 'Interest') {
      setInterestName(event.target.value)
    }

    if (event.target.name === 'position') {
      setPosition(event.target.value)
    }
  }

  const assignFieldValues = (editData) => {

    setInterestName(editData.name)
    setPosition(editData.position)
    setImage(editData.icon)
    console.log(editData)
  }

  const handleFileSelected = event => {
    setImage(URL.createObjectURL(event.target.files[0]))
    setImageFile(event.target.files[0])
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
          <h1 className='h2 mb-0  text-dark'>All Interests</h1>
          <div className='d-flex flex-column flex-sm-row'>
            <div
              style={{ marginTop: 10 + 'px' }}
              className='create-content order-sm-1'
            >
              <button
                className='dropdown-item'
                data-toggle='modal'
                data-target='#logoutModal'
              >
                Create Interest{' '}
                <span>
                  <i class='bi bi-plus'></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-100 container-fluid bg-light pt-4'>
        <div className=' w-100 '>
          <div className='card mb-4'>
            <div className=''>
              <Search />
              <div className='container  pb-4'>
                <div className='row'>
                  {interests.map(interest => (
                    <div className='col-lg-3 col-md-6' key={interest.id}>
                      <div class='card text-center border border-2 m-3 p-3 bg-light'>
                        <img
                          src={interest.icon}
                          style={{ height: '100px', objectFit: 'contain' }}
                          class='card-img-top'
                          alt='...'
                        />
                        <div class='card-body'>
                          <h5 class='card-title '>{interest.name}</h5>
                          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                        <div className='card-footer d-flex justify-content-between'>
                          <a
                            href='#'
                            className='btn btn-outline-warning btn-sm'
                            data-toggle='modal'
                            data-target='#logoutModal'
                         onClick={()=>assignFieldValues(interest)}
                          >
                            Edit
                          </a>{' '}
                          <a href='#' className='btn btn-outline-danger btn-sm' onClick={()=>handleDelete(interest._id)}>
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class='modal fade'
        id='logoutModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog' role='document'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h4 class='text-dark'>Create Interest</h4>
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
              <form action='' onSubmit={postIntrest}>
                <div>
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

                    <div className='row'>
                      <div className='col-md-8'>
                        <div class='pt-4'>
                          <p>Name</p>
                          <div class='title'>
                            <input
                              type='text'
                              name='Interest'
                              value={interestName}
                              placeholder='Enter Interest e.g Meditation'
                              id='Interest'
                              onChange={handleFormChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div class='pt-4'>
                          <p>Position</p>
                          <div class='title'>
                            <input
                              type='text'
                              name='position'
                              placeholder='Position e.g 2'
                              id='position'
                              value={position}
                              onChange={handleFormChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class='modal-create-content'>
                      <button type='submit'> {savingData?<>Saving Data ...</>:<>Save Interest</>}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageInterest
