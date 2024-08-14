import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, AUTH_DOMAIN } from '../../utils/config'
import { useNavigate } from 'react-router-dom'

function Login () {

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate('')


  const handleFormChange = event => {
    if (event.target.name === 'email') {
      setEmail(event.target.value)
    }

    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }

     
  }

  const sendLogin= async()=>{
    setLoading(true)
    let sendData={"email":email, "password":password}
    console.log(sendData);
    const sendRes=await axios.post(`${BASE_URL}${AUTH_DOMAIN}/login`, sendData)
    if(sendRes.data.status===true){
        window.location.href="/admin"
        localStorage.setItem("md-token",sendRes.data.data.token)
    }else{
        setLoading(false)
        alert(sendRes.data.message)
    }
  }
  return (
    <>
      <div className='container mt-5'>
        <div className='row my-5'>
          <div className='col-md-4 mx-auto'>
           <div className="card border border-1">
            <div className="card-body">
            <form>
              <div className="text-center">
              <img
                class='mb-4 text-center'
                src='../logo512.png'
                alt=''
                style={{ height: '60px', width: '60px', objectFit: 'contain', borderRadius:"8px" }}
              />
              </div>
              <h4 class='text-dark text-center'>Admin Login</h4>
              <br />

              <div class='form-floating'>
                <input
                  type='email'
                  name='email'
                  onChange={handleFormChange}
                  class='form-control'
                  id='floatingInput'
                  placeholder='name@example.com'
                />
                <label for='floatingInput'>Email address</label>
              </div>
              <br />
              <div class='form-floating'>
                <input
                  type='password'
                  name='password'
                  onChange={handleFormChange}
                  class='form-control'
                  id='floatingPassword'
                  placeholder='Password'
                />
                <label for='floatingPassword'>Password</label>
              </div>

              <br />
              <button class='btn w-100 py-2 text-white' style={{ background:"#461470" }} type='button' onClick={()=>sendLogin()}>
                {loading?<>Loading...</>:<>Sign in</>}
              </button> <br /><br />
            </form>
            </div>
           </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
