import React, { useEffect, useState } from 'react'
import WebsiteLayout from '../../components/WebsiteLayout'
import { useSearchParams } from 'react-router-dom'

function Checkout () {
  const [urlParams, setSearchParams] = useSearchParams()
  const [loadedData, setLoadedData] = useState('')
  const [errMessage, setErrMessage] = useState('')

  useEffect(() => {
    if (urlParams.get('email') != null) {
      loadCheckOutData()
    } else {
      window.location.href = '/business'
    }
  })

  const loadCheckOutData = () => {
    let paymentData = {
      assignedName: urlParams.get('assignedName'),
      email: urlParams.get('email'),
      totalUsers: urlParams.get('totalUsers'),
      totalMonths: urlParams.get('totalMonths')
    }

    console.log(paymentData)

    fetch(
      'https://mindcastserver-a98c5305de98.herokuapp.com/api/v1/user/create-coupons',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status === false) {
          setLoadedData('false')
          setErrMessage(data.message)
        } else if (data.status === true) {
          setLoadedData('true')
        }
      })
      .catch(error => {
        alert('Error occurred!')
      })
  }

  return (
    <div>
      <WebsiteLayout>
        <br />
        <br />
        <br />
        <div class='container'>
          <div class='row'>
            <div class='col-md-5 mx-auto'>
              <div id='message'>
                {
                  {
                    '': (
                      <div
                        class='text-center'
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <div class='loader-lg'></div>
                      </div>
                    ),
                    false: (
                      <div class=''>
                        <h1 class='text-danger'>{errMessage}</h1>
                        <hr />
                        <h6 id='subtitleText'>
                          Details provided does not exists... please make
                          payment to generate subscription codes .. <br />
                          <br /> If your payment has been deducted please
                          contact support to rectify the issue .
                        </h6>
                      </div>
                    ),
                    true: (
                      <div class='text-center'>
                        <h1 class='text-dark'>Thank you for Subscription </h1>
                        <hr />
                        <h6 id='subtitleText'>
                          Your employees coupon codes has been sent to your
                          company email address provided earlier. Please the
                          expiration for each code commences once an employee
                          uses it to subscribe.
                        </h6>
                      </div>
                    )
                  }[loadedData]
                }
              </div>
            </div>
          </div>
        </div>
      </WebsiteLayout>
    </div>
  )
}
export default Checkout
