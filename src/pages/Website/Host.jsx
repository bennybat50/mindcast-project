import React from 'react'

function Host() {
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") !== -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";

    if (OSName === "MacOS") {
        window.location.assign("https://apps.apple.com/ng/app/mindacst/id6463614493");
    } else {
        window.location.assign("https://play.google.com/store/apps/details?id=com.psyche.life");
    }
    document.write('Your OS: ' + OSName);
  return (
    <div>
        <div class="message"></div>
    </div>
  )
}

export default Host