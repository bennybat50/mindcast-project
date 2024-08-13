// import React, { useEffect, useState } from 'react';
import Resource from './Resource'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, USER_DOMAIN } from '../utils/config'
import CreateContentModal from './CreateContentModal'
import { log10 } from 'chart.js/helpers'

function Content () {
  const [resources, setResources] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [editData, setEditData] = useState()
  const [showCount, setshowCount]=useState(0)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${USER_DOMAIN}/resources`)
      const reversedData = res.data.data.reverse() // Reverse the data
      setResources(reversedData)
    } catch (error) {
      console.error('Error fetching resources:', error.message)
    }
  }

  const handleDeleteResource = async me => {
    if(window.confirm("Are you sure you want to delete this content")){
      try {
        let auser = { id: me }
        console.log(auser)
        const response = await axios.post(
          `${BASE_URL}${USER_DOMAIN}/resources/delete`,
          auser
        )
        if (response.status === 200) {
          fetchResources()
          alert('Content Deleted')
          console.log('Data deleted successfully')
        }
      } catch (error) {
        console.error('Error deleting data:', error.message)
      }
    }
   
  }
  const newModal=()=>{
    setShowAll(false)
    setShowAll(true)
    setEditData()
  }
  const updateResource=(res)=>{
    setShowAll(false)
    setShowAll(true)
    setEditData(res)
    setshowCount(showCount+1) 
  }

  const formatTimestampToDate = timestamp => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }
  return (
    <div className=''>

    <div
        class='modal fade'
        id='contentEdittModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
         {showAll? <CreateContentModal  editData={editData}/>:<></>}
      </div>

      <div className='container'>
        <div className=' card pb-4 pt-3'>
          <div className='card-header pb-4 flex-row'>
            <div className='d-sm-flex justify-content-between mb-4'>
              <h1 className='h2 mb-0  text-dark'>
                {' '}
                All Contents ({resources.length})
              </h1>
              <div className='d-flex flex-column flex-sm-row'>
                <div
                  style={{ marginTop: 10 + 'px' }}
                  className='create-content order-sm-1'
                >
                  <a
                     className='btn btn-outline-secondary'
                     href='#'
                     data-toggle='modal'
                     data-target='#contentEdittModal'
                     onClick={() =>
                      newModal()
                     }
                  >
                    Create Content{' '}
                    <span>
                      <i class='bi bi-plus'></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>IMAGE</th>
                    <th scope='col'>TITLE</th>
                    <th scope='col'>MOOD </th>
                    <th scope='col'>DURATION</th>
                    <th scope='col'>MODE</th>
                    <th scope='col'>TIME </th>
                    <th scope='col'>AUDIO</th>
                    <th scope='col'>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource, index) => {
                    return (
                      <tr key={resource._id}>
                        <th scope='row'>
                          <span>
                            <img
                              src={resource.image}
                              alt=''
                              className='socialImage'
                            />
                          </span>{' '}
                        </th>
                        <td>{resource.title}</td>
                        <td>
                          {resource.moodType === 'happy' ? (
                            <label className='badge-pill badge-success mt-3'>
                              HAPPY
                            </label>
                          ) : (
                            <></>
                          )}
                          {resource.moodType === 'sad' ? (
                            <label className='badge-pill badge-dark mt-3'>
                              SAD{' '}
                            </label>
                          ) : (
                            <></>
                          )}
                          {resource.moodType === 'angry' ? (
                            <label className='badge-pill badge-danger mt-3'>
                              ANGRY
                            </label>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>{resource.duration}</td>
                        <td>{resource.paymentType==="paid"?<b className='text-success'>{resource.paymentType}</b>:<b className='text-warning'>{resource.paymentType}</b>}</td>

                        <td>{new Date(resource.time_created).toLocaleDateString("en-US")}</td>
                        <td><audio controls="false"><source src={resource.resourceUrl} type="audio/mp3" />Your browser does not support the audio element.</audio></td>
                        <td>

                          <li className='nav-item dropdown no-arrow'>
                            <a
                              className='nav-link dropdown-toggle'
                              href='#'
                              id='userDropdown'
                              role='button'
                              data-toggle='dropdown'
                              aria-haspopup='true'
                              aria-expanded='false'
                            >
                              <i className='bi bi-three-dots-vertical'></i>
                            </a>
                            <div
                              className='dropdown-menu dropdown-menu-left animated--grow-in'
                              aria-labelledby='userDropdown'
                            >

                                
                              <a
                                className='dropdown-item'
                                href='#'
                                data-toggle='modal'
                                data-target='#contentEdittModal'
                                onClick={() =>
                                 updateResource(resource)
                                }
                              >
                                Edit
                              </a>
                              <a
                                className='dropdown-item text-danger'
                                href='#'
                                data-toggle='modal'
                                data-target=''
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
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
