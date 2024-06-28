import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

function WebsiteLayout(props) {
  return (
    <div>
        <div className="WebsiteLayout">
            <Nav />
            <div className="bodyy">
                {props.children}
            </div>
            <Footer/>
        </div>
    </div>
  )
}

export default WebsiteLayout