import React from "react";

function Clint() {
  return (
    <>
      <section className="client_section ">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Testimonial</h2>
            <p>
              Even slightly believable. If you are going to use a passage of
              Lorem Ipsum, you need to
            </p>
          </div>
        </div>
        <div className="container px-0">
          <div
            id="customCarousel2"
            className="carousel  slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 mx-auto">
                      <div className="box">
                        <div className="img-box">
                          <img src="image/client.jpg" alt="" />
                        </div>
                        <div className="detail-box">
                          <div className="client_info">
                            <div className="client_name">
                              <h5>Ravi Mehta</h5>
                              <h6>Customer</h6>
                            </div>
                            <i
                              className="fa fa-quote-left"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <p>
                            Booking a plumber has never been this easy! Within
                            minutes, I found a professional nearby, and the
                            issue was fixed the same day. Great platform and
                            hassle-free experience
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 mx-auto">
                      <div className="box">
                        <div className="img-box">
                          <img src="image/client.jpg" alt="" />
                        </div>
                        <div className="detail-box">
                          <div className="client_info">
                            <div className="client_name">
                              <h5>Shashi Kapoor</h5>
                              <h6>Customer</h6>
                            </div>
                            <i
                              className="fa fa-quote-left"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <p>
                            I used the car washing service, and the results were
                            fantastic. The provider was punctual, professional,
                            and reasonably priced. Definitely using the platform
                            again
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 mx-auto">
                      <div className="box">
                        <div className="img-box">
                          <img src="image\client.jpg" alt="" />
                        </div>
                        <div className="detail-box">
                          <div className="client_info">
                            <div className="client_name">
                              <h5>Aman Singh</h5>
                              <h6>Customer</h6>
                            </div>
                            <i
                              className="fa fa-quote-left"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <p>
                            Needed an electrician urgently, and this platform
                            saved the day. I found a reliable service provider
                            with good ratings, and the work was done smoothly.
                            Highly recommend it
                          </p>
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
                href="#customCarousel2"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-angle-left" aria-hidden="true"></i>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#customCarousel2"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Clint;
