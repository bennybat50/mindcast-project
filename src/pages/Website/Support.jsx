import React from "react";
import WebsiteLayout from "../../components/WebsiteLayout";

function Support() {
  return (
    <div>
      <WebsiteLayout>
        <div className="Support">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
            integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
            crossorigin="anonymous"
          />
          <section class="section gray-bg" id="contactus">
            <div class="container">
              <div class="row">
                <div class="col-lg-6">
                  <div class="section-title">
                    <h2>Send Support a message</h2>
                    <p>
                      Use this for to request support from Mindacst or make any
                      enqiry
                    </p>
                  </div>
                </div>
              </div>
              <div class="row flex-row-reverse mt-5">
                <div class="col-md-7 col-lg-8 m-15px-tb">
                  <div class="contact-form">
                    <form
                      action="/"
                      method="post"
                      class="contactform contact_form"
                      id="contact_form"
                    >
                      <div
                        class="returnmessage valid-feedback p-15px-b"
                        data-success="Your message has been received, We will contact you soon."
                      ></div>
                      <div class="empty_notice invalid-feedback p-15px-b">
                        <span>Please Fill Required Fields</span>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <input
                              id="name"
                              type="text"
                              placeholder="Full Name"
                              class="form-control"
                            />
                            <br />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input
                              id="email"
                              type="text"
                              placeholder="Email Address"
                              class="form-control"
                            />
                            <br />
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="form-group">
                            <input
                              id="subject"
                              type="text"
                              placeholder="Subject"
                              class="form-control"
                            />
                            <br />
                          </div>
                        </div>
                        <br />
                        <div class="col-md-12">
                          <div class="form-group">
                            <textarea
                              id="message"
                              placeholder="Message"
                              class="form-control"
                              rows="3"
                            ></textarea>
                            <br />
                          </div>
                        </div>
                        <br />
                        <div class="col-md-12">
                          <div class="send">
                            <a id="send_message" class="text-light" href="#">
                              <span>Contact Us</span> <i class="arrow"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-md-5 col-lg-4 m-15px-tb">
                  <div class="contact-name">
                    <h5>Mail</h5>
                    <p>
                      <a
                        href="/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="21484f474e61454e4c40484f4f404c440f424e4c"
                      >
                        info@mindcasts.life
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <script
            data-cfasync="false"
            src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
          ></script>
        </div>
      </WebsiteLayout>
    </div>
  );
}

export default Support;
