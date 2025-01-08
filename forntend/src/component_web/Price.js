import React from "react";
import { Link } from "react-router-dom";

function Price() {
  return (
    <>
      <section id="boss" className="price_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Pricing</h2>
          </div>
          <div className="price_container ">
            <div className="box">
              <div className="detail-box">
                <h2>
                  {" "}
                   ₹ 200
                </h2>
                <h6>Home services</h6>
                <ul className="price_features">
                  <li></li>
                  <li></li>
                  <li>Weekly checkups</li>
                  <li>ensure top-quality</li>
                  <li></li>
                  <li>24/7/365 assistance</li>
                </ul>
              </div>
              <div className="btn-box">
                <Link className="btn" to="">See Detail</Link>
              </div>
            </div>
            <div className="box">
              <div className="detail-box">
                <h2>
                  {" "}
                   ₹ 299
                </h2>
                <h6>Automobile Services</h6>
                <ul className="price_features">
                  <li></li>
                  <li></li>
                  <li>Weekly upadation</li>
                  <li>free glass Protection</li>
                  <li>Full Root Access</li>
                  <li>24/7/365 Availale for assistance</li>
                </ul>
              </div>
              <div className="btn-box">
                <Link className="btn" to="">See Detail</Link>
              </div>
            </div>
            <div className="box">
              <div className="detail-box">
                <h2>
                  ₹ 450
                </h2>
                <h6>Cleaning Services</h6>
                <ul className="price_features">
                  <li>cover all Home area</li>
                  <li>Customize service Availale</li>
                  <li></li>
                  <li>Ensure Security</li>
                  <li>Provide Top top-quality service</li>
                  <li></li>
                </ul>
              </div>
              <div className="btn-box">
                <Link className="btn" to="">See Detail</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Price;
