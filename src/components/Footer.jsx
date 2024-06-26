import React from "react";
import Logo from '../assets/image/MINDCASTS.png'

function Footer() {
  return (
    <div>
      <div className="Footer footer margin60">
        <div class="container">
          <div class="row">
            <div class="col-md-3 ">
              <ul>
                <li>
                  <a href="index.html">
                    <img class="mb-4" src={Logo} alt="" />
                  </a>
                </li>
                <li>
                  Take charge of your <br /> mental health and <br /> well-being
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <ul>
                <li>
                  <a href="/about" target="_blank">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/host" target="_blank">
                    Become a host
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <ul>
                <li>
                  <a href="/resources">Resources</a>
                </li>
                <li>
                  <a href="/business">For Business</a>
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <ul>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/support">Support</a>{" "}
                </li>
                <li>
                  <a href="/tems">Terms Of Us</a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
