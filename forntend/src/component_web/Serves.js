import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

function Serves() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // Array of card data
  const services = [
    {
      id: 1,
      image: "image/s1.png",
      title: "Plumbing",
      description: "Fixing leaks, installing faucets, and maintaining pipelines.",
      link: "Plumbing",
    },
    {
      id: 2,
      image: "image/s2.png",
      title: "Electrical Repairs",
      description: "Wiring, circuit repairs, and installation of electrical appliances.",
      link: "Electrical",
    },
    {
      id: 3,
      image: "image/s3.png",
      title: "Carpentry",
      description: "Furniture repairs, custom woodwork, and installations.",
      link: "Carpentry",
    },
    {
      id: 4,
      image: "image/s4.png",
      title: "Appliance Maintenance",
      description: "Repair and servicing of home appliances like refrigerators, ACs, and washing machines.",
      link: "Appliance",
    },
    {
      id: 5,
      image: "image/s5.png",
      title: "Automobile Services",
      description: "Convenient car washing, detailing, and repair services at your location.",
      link: "Automobile",
    },
    {
      id: 6,
      image: "image/s6.png",
      title: "Cleaning Services",
      description: "Professional house cleaning, pest control, and laundry services for a spotless space.",
      link: "Automobile",
    },
  ];

  const serverHendal = (link) => {
   
    navigate(`/EmployeeList/${link}`);
  };

  return (
    <>
      <section className="service_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Services</h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {services.map((service) => (
              <div className="col-md-6 col-lg-4" key={service.id}>
                <div className="box">
                  <div className="img-box">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="detail-box">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                    <a onClick={() => serverHendal(service.link)}>
                      Read More
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Serves;