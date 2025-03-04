import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_00rdrcl", "template_9xgyxk8", form.current, {
        publicKey: "ZSX01H4pDUWuCVvgX",
      })
      .then(
        () => {
          toast.success("Email sent successfully! ✅", {
            position: "top-right",
          });
          form.current.reset(); // Reset form after success
        },
        (error) => {
          toast.error("Email failed to send. ❌", {
            position: "top-right",
          });
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <ToastContainer />
      <section className="contact_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Get In Touch</h2>
          </div>
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <div className="form_container">
                <form ref={form} onSubmit={sendEmail}>
                  <div>
                    <input type="text" name="from_name" placeholder="Your Name" required />
                  </div>
                  <div>
                    <input type="email" name="from_email" placeholder="Your Email" required />
                  </div>
                  <div>
                    <input type="text" name="phone" placeholder="Your Phone" required />
                  </div>
                  <div>
                    <textarea className="message-box" placeholder="Message" name="message" required></textarea>
                  </div>
                  <div className="btn_box">
                    <button type="submit">SEND</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
