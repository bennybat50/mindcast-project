import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'

import { ThreeDotsVertical, ArrowRightShort } from 'react-bootstrap-icons'
import profileImageOne from '../assets/image/profileImage-one.webp'

import { BASE_URL, USER_DOMAIN } from '../utils/config'
// import singleHost from './SingelHost';
import Resource from './Resource'
import { Cloudinary } from '@cloudinary/url-gen'
import Search from './Search'
import CreateContentModal from './CreateContentModal'
import { Bar, Pie } from 'react-chartjs-2'

Chart.register(CategoryScale)

function DashContent ({ itemId }) {
  const [data, setData] = useState([])
  const [resources, setResources] = useState([])
  const [interests, setInterests] = useState([])
  const [hostRequests, setHostRequests] = useState([])
  const [error, setError] = useState(null)

  const [userChartData, setUserChartData] = useState({})
  const [showCharts, setShowCharts] = useState(false)

  const [resourceInterestData, setResourceInterestData] = useState({})
  const [topResources, setTopResource] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${USER_DOMAIN}/users`)
      const reversedData = res.data.data.reverse() // Reverse the data
      setData(reversedData)

      const interestsRes = await axios.get(
        `${BASE_URL}${USER_DOMAIN}/interests`
      )
      setInterests(interestsRes.data.data)

      const resData = await axios.get(`${BASE_URL}${USER_DOMAIN}/resources`)
      setResources(resData.data.data)

      const hostData = await axios.get(`${BASE_URL}${USER_DOMAIN}/hosts`)
      setHostRequests(hostData.data.data)

      const topData = await axios.get(`${BASE_URL}${USER_DOMAIN}/top-resources`)
      setTopResource(topData.data.data)

      const usersGained = await axios.get(
        `${BASE_URL}${USER_DOMAIN}/users-gained-yearly`
      )

      updateUserGainedSummary(usersGained.data)

      const resourceInterest = await axios.get(
        `${BASE_URL}${USER_DOMAIN}/resources-per-interest`
      )
      updateRPTSummary(resourceInterest.data)
    } catch (error) {
      setError(error)
    }
  }

  const updateUserGainedSummary = gainedData => {
    console.log(gainedData)
    setUserChartData({
      labels: gainedData.map(data => data._id),
      datasets: [
        {
          label: 'Users Gained ',
          data: gainedData.map(data => data.count),
          backgroundColor: ['rgba(75,192,192,1)', '#50AF95'],
          borderColor: 'black',
          borderWidth: 0
        }
      ]
    })
  }

  const updateRPTSummary = rptsData => {
    setResourceInterestData({
      labels: rptsData.map(data => data.interest),
      datasets: [
        {
          label: 'Resource Per Interest ',
          data: rptsData.map(data => data.count),
          backgroundColor: [
            '#215c86',
            '#8d0c9e',
            '#07b273',
            '#c69d09',
            '#4d66ea',
            '#5a07ba'
          ],
          borderColor: 'black',
          borderWidth: 0
        }
      ]
    })

    setShowCharts(true)
  }

  const handleDelete = async me => {
    try {
      let auser = { id: me }
      console.log(auser)
      const response = await axios.post(
        `${BASE_URL}${USER_DOMAIN}/delete`,
        auser
      )
      if (response.status === 200) {
        fetchData()
        alert('User Deleted')
        console.log('Data deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting data:', error.message)
    }
  }

  const sortedUsers = [...data].sort(
    (a, b) => new Date(b.time_created) - new Date(a.time_created)
  )

  return (
    <>
      <div
        class='modal fade'
        id='contenttModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <CreateContentModal />
      </div>
      <div className='w-100 container-fluid bg-light pt-4'>
        <div className='d-sm-flex justify-content-between mb-4'>
          <h1 className='h2 mb-0 dashboard text-dark'>Dashboard</h1>
          <div className='d-flex flex-column flex-sm-row'>
            <div
              style={{ marginTop: 10 + 'px' }}
              className='create-content order-sm-1'
            >
              <button
                className='dropdown-item'
                data-toggle='modal'
                data-target='#contenttModal'
              >
                Create Content{' '}
                <span>
                  <i class='bi bi-plus'></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-3 col-md-6 mb-4'>
            <div className='card cards  h-100 py-2'>
              <div className='card-body'>
                <div className='row no-gutters align-items-center'>
                  <div className='col mr-1'>
                    <div className='text-xs text-secondary mb-1 text-lights'>
                      Uploaded Resources
                    </div>
                    <div className='h3 mb-0 font-weight-bold text-dark'>
                      {resources.length}
                    </div>
                  </div>
                  <div className='col-auto'>
                  <i class='bi bi-file-earmark-music-fill text-dark fa-2x'></i> 
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-xl-3 col-md-6 mb-4'>
            <div className='card cards h-100 py-2'>
              <div className='card-body'>
                <div className='row no-gutters align-items-center'>
                  <div className='col mr-1'>
                    <div className='text-xs text-secondary mb-1  text-lights'>
                      Users
                    </div>
                    <div className='h3 mb-0 font-weight-bold text-dark'>
                      {sortedUsers.length}
                    </div>
                  </div>
                  <div className='col-auto'>
                  <i class='bi bi-people-fill text-dark fa-2x'></i> 
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-xl-3 col-md-6 mb-4'>
            <div className='card cards h-100 py-2'>
              <div className='card-body'>
                <div className='row no-gutters align-items-center'>
                  <div className='col mr-1'>
                    <div className='text-xs text-secondary mb-1  text-lights'>
                      Host request
                    </div>
                    <div className='h3 mb-0 font-weight-bold text-dark'>
                      {hostRequests.length}
                    </div>
                  </div>
                  <div className='col-auto'>
                  <i class='bi bi-person-raised-hand  text-dark fa-2x'></i> 
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-xl-3 col-md-6 mb-4'>
            <div className='card cards h-100 py-2'>
              <div className='card-body'>
                <div className='row no-gutters align-items-center'>
                  <div className='col mr-1'>
                    <div className='text-xs text-secondary mb-1  text-lights'>
                      Avg. time on app
                    </div>
                    <div className='h5 mb-0 font-weight-bold text-dark'>
                      00:00
                    </div>
                  </div>
                  <div className='col-auto'>
                  <i class='bi bi-people-fill text-dark fa-2x'></i> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='card mb-4'>
          <div className='card-header py-3 flex-row align-items-center'>
            <h5 className='m-0 font-weight-bold text-dark'>Mindcast Summary</h5>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-6'>
                {showCharts ? (
                  <Bar
                    data={userChartData}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: 'Users Gained'
                        }
                      }
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="col-md-2"></div>
              <div className='col-md-4'>
                {showCharts ? (
                  <Pie
                    data={resourceInterestData}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: 'Resources Per Interest'
                        }
                      }
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xl-8 col-md-12'>
            <div className='card mb-4'>
              <div className='card-header py-3 flex-row'>
                <h5 className='font-weight-bold text-dark'>
                  Recent Signups
                </h5>
              </div>
              <div className='all-users-scroll'>
                <Search />
                <div className='container  pb-4'>
                  <div className='table-responsive'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>USER</th>
                          <th>EMAIL</th>
                           
                          <th>SUBSCRIPTION</th>
                          <th>DATE</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedUsers.slice(0, 20).map(user => (
                          <tr key={user.id}>
                            <th scope='row '>
                             
                              <span className=' text-dark '>
                                {user.username}{' '}
                              </span>
                            </th>
                            <td className=' text-dark'>{user.email}</td>
                            {/* <td>
                              {user.mood === 'Happy' ? (
                                <label className='badge-pill badge-success mt-3'>
                                  HAPPY
                                </label>
                              ) : (
                                <></>
                              )}
                              {user.mood === 'Sad' ? (
                                <label className='badge-pill badge-dark mt-3'>
                                  SAD
                                </label>
                              ) : (
                                <></>
                              )}
                              {user.mood === 'Angry' ? (
                                <label className='badge-pill badge-danger mt-3'>
                                  ANGRY
                                </label>
                              ) : (
                                <></>
                              )}
                            </td> */}
                            <td> {user.status==="paid"?<b className='text-success'>{user.status}</b>:<b className='text-warning'>{user.status}</b>} Mode</td>
                            <td className=" text-dark">{new Date(user.time_created).toLocaleDateString("en-US")}</td>
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
                                  <a className='dropdown-item' href='#'>
                                    Make a host
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Edit Profile
                                  </a>
                                  <a className='dropdown-item' href='#'>
                                    Send Message
                                  </a>
                                  <a
                                    className='dropdown-item text-danger'
                                    href='#'
                                    data-toggle='modal'
                                    data-target=''
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
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-md-12'>
            <div className='card mb-4'>
              <div className='card-header'>
                <h5 className='text-dark font-weight-bold'>Top Resources</h5>
              </div>
              <div className='card-body'>
                <div className="all-users-scroll">
                <ol class='list-group list-group-numbered'>
                  {topResources.map((data)=>{
                    return (<li class='list-group-item d-flex justify-content-between align-items-start'>
                      <div class='ms-2 me-auto'>
                        <div class='fw-bold'>{data.title}</div>
                         <small> {data.paymentType==="paid"?<b className='text-success'>{data.paymentType}</b>:<b className='text-warning'>{data.paymentType}</b>}</small>
                      </div>
                      <span class='badge text-bg-primary rounded-pill'>{data.no_plays}</span>
                    </li>)
                  })}
                  
                </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Resource />
      </div>
      <div
        class='modal fade'
        id='Broadcast'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog' role='document'>
          <div class='modal-content'>
            <div class='modal-header'>
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
              <div class='all-users'>
                <p>
                  All users <span class='total-users'>49</span>
                </p>
              </div>
              <div class='modal-img-row'>
                <img src={profileImageOne} alt='' />
                <img src={profileImageOne} alt='' />
                <img src={profileImageOne} alt='' />
                <img src={profileImageOne} alt='' />
                <img src={profileImageOne} alt='' />
                <img src={profileImageOne} alt='' />
              </div>
              <div class='modal-broadcast'>
                <p>Send message</p>
                <textarea
                  name=''
                  id=''
                  placeholder='Write description, this will show in users push notifications'
                ></textarea>
                <p>0/1000</p>
                <button class='modal-broadcast-btn'>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashContent
