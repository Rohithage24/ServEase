import React from "react";
import './navber.css'

function About() {
  return (
    <>
      <section className="about_section layout_padding-bottom">
        <div className="container  ">
          <div className="row">
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Us</h2>
                </div>
                <p>
                  Welcome to our one-stop platform for all your service needs!
                  We connect users with trusted professionals offering a range
                  of services, including plumbing, electrical repairs, car
                  washing, beauty treatments, and more. Whether it's home
                  maintenance, automobile care, or cleaning services, we make
                  booking easy, quick, and reliable. With verified service
                  providers, location-based recommendations, and transparent
                  ratings, we ensure top-quality service at your convenience.
                  Our mission is to simplify your everyday tasks by bringing the
                  right professionals to your doorstep.{" "}
                </p>
                <a className="btn " href="">Read More</a>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="img-box">
                <img src="image/about-img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
