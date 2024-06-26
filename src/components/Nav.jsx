import React from "react";
import Logo from '../assets/image/LOGO MINDCASTS.png'

function Nav() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg margin30">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src={Logo} alt="" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <ul class="nav-list">
              <li>
                <a href="/business">For Business</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/resources">Resources</a>
              </li>
              <li class="me-0">
                <a class="host" href="/host" target="_blank">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
