import React, { useEffect, useState } from "react";

function Host() {
  const [device, setDevice] = useState("");

  useEffect(() => {
    
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") !== -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";

    if (OSName === "MacOS") {
        window.location.href="https://apps.apple.com/ng/app/mindacst/id6463614493";
    } else {
        window.location.href="https://play.google.com/store/apps/details?id=com.psyche.life";
    }
    setDevice(OSName);
   
  },[]);
  return (
    <div>
      <br />
      <br />
      <br />
        <div class="message">{device}</div>
    </div>
  )
}

export default Host