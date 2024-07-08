import React from 'react'
import WebsiteLayout from '../../components/WebsiteLayout'

function DeleteAccount () {
  return (
    <div>
      <WebsiteLayout>
        <div class='container'>
          <div class=''>
            <div class='col-md-12 left-contact'>
              <h4> Request Account Delete</h4>
              <p>
                <b>Note:</b> Your account will be deleted withing the next 90
                days if there is no activity{' '}
              </p>
              <br />
              <br />
              <form
                class='form-inline form-contact-finance'
                name='contact'
                method='get'
                action=''
              >
                <div className='row'>
                  <div className='col-md-12 mb-4'>
                    <div class='form-group '>
                      <input
                        type='text'
                        class='form-control'
                        name='email'
                        id='email'
                        placeholder='Your Email Address'
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className='col-md-12'>
                    <div class='form-group'>
                      <textarea
                        id='textarea'
                        class='form-control'
                        name='comments'
                        rows='6'
                        placeholder='Reason Why'
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                <button
                  class='btn large-btn btn-rounded  btn-main-color btn-submit'
                  id='send_message'
                  style={{ backgroundColor: '#1A7BB7', color:"#fff" }}
                >
                  Send Request
                </button>
                </div>
               
                <br /> <br />
                
              </form>
            </div>
          </div>
        </div>
      </WebsiteLayout>
    </div>
  )
}

export default DeleteAccount
