import React, { useEffect, useState } from 'react'

function CheckAdmin () {

    useEffect(() => {
        if(localStorage.getItem("md-token")==null){
            window.location.href="/md-login"
        }
      }, [])
}

export default CheckAdmin