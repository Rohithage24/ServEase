import React from "react";
import { Link } from "react-router-dom";

function Information() {
  return (
    <>
      <section className="info_section layout_padding2">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="info_contact">
                <h4>Address</h4>
                <div className="contact_link_box">
                  <a href="">
                    <i class="bi bi-house-door-fill"></i>
                    <span>CRAK IT Tower , A1 Road Nagpur</span>
                  </a>
                  <a href="">
                    <i class="bi bi-phone-fill"></i>
                    <span>Call +91 878897653</span>
                  </a>
                  <Link >
                    <i class="bi bi-envelope-open-fill"></i>
                    <span>servease@gmail.com</span>
                  </Link>
                </div>
              </div>
              <div className="info_social">
                <a href="">
                  <i className="bi bi-facebook" aria-hidden="true"></i>
                </a>
                <a href="">
                  <i className="bi bi-twitter" aria-hidden="true"></i>
                </a>
                <a href="">
                  <i className="bi bi-linkedin" aria-hidden="true"></i>
                </a>
                <a href="">
                  <i className="bi bi-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_link_box">
                <h4>Links</h4>
                <div className="info_links">
                  <a className="active" href="index.html">
                    <img src="images/nav-bullet.png" alt="" />
                    Home
                  </a>
                  <a className="" href="about.html">
                    <img src="images/nav-bullet.png" alt="" />
                    About
                  </a>
                  <a className="" href="service.html">
                    <img src="images/nav-bullet.png" alt="" />
                    Services
                  </a>
                  <a className="" href="price.html">
                    <img src="images/nav-bullet.png" alt="" />
                    Pricing
                  </a>
                  <a className="" href="contact.html">
                    <img src="images/nav-bullet.png" alt="" />
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_detail">
                <h4>Info</h4>
                <p>
                  necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with a handful
                </p>
              </div>
            </div>
            <div className="col-md-3 mb-0">
              <h4>Subscribe</h4>
              <form action="#">
                <input type="text" placeholder="Enter email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Information;
