import React from "react";
import { Link } from "react-router-dom";

function Contant() {
  return (
    <>
      <section className="slider_section sider">
        <div
          id="customCarousel1"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container ">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-box">
                      <h1>
                      Seamless Solutions, <br />
                         Anytime, Anywhere  At Your Doorstep!
                      </h1>
                      <p>
                        We connect users with trusted service providers for
                        plumbing, electrical work, car washing, beauty, and
                        more making service booking easy and reliable.{" "}
                      </p>
                      <div className="btn-box">
                        <a href="" className=" btn btn-1 ">
                          Read More
                        </a>
                        <Link  className="btn btn-2">
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className=" col-lg-10 mx-auto">
                        <div className="img-box">
                          <img
                            src="image/logo3.png"
                            className="img-box img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container ">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-box">
                      <h1>
                        Cleaning Services <br />
                      </h1>
                      <p>
                        Our cleaning services provide professional house
                        cleaning, pest control, and laundry solutions tailored
                        to your needs. Enjoy a spotless home without the hassle,
                        leaving the hard work to our trusted experts{" "}
                      </p>
                      <div className="btn-box">
                        <a href="" className="btn btn-1">
                          Read More
                        </a>
                        <a href="" className="btn btn-2">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className=" col-lg-10 mx-auto">
                        <div className="img-box img-fluid">
                          <img src="image/client2.png" className="fluid" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container ">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-box">
                      <h1>
                        Fast & Secure <br />
                        Web Hosting
                      </h1>
                      <p>
                        Anything embarrassing hidden in the middle of text. All
                        the Lorem Ipsuanything embarrassing hidden in the middle
                        of text. All the Lorem Ipsumm{" "}
                      </p>
                      <div className="btn-box">
                        <a href="" className="btn btn-1">
                          Read More
                        </a>
                        <a href="" className="btn btn-2">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className=" col-lg-10 mx-auto">
                        <div className="img-box">
                          <img src="image/elec.jpg" className="fluid" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel_btn-box">
            <a
              className="carousel-control-prev"
              href="#customCarousel1"
              role="button"
              data-slide="prev"
            >
             <i class="bi bi-caret-left-square"></i>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#customCarousel1"
              role="button"
              data-slide="next"
            >
              <i class="bi bi-caret-right-square"></i>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>

      {/* server section 

  <section className="server_section">
    <div className="container ">
      <div className="row">
        <div className="col-md-6">
          <div className="img-box">
            <img src="image/server-img.jpg" alt="" />
            <div className="play_btn">
              <button>
                <i className="fa fa-play" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-box">
            <div className="heading_container">
              <h2>
                Let us manage your server
              </h2>
              <p>
                Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
              </p>
            </div>
            <a href="">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>  */}

     
    </>
  );
}

export default Contant;
