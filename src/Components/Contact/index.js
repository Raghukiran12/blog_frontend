import React from 'react';
import './contact.css';
const Contact = ()=>{

    return(
        <div>
        <div className="contact-in">
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.590052556925!2d80.49809267466479!3d16.496282827864842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f27d40f21c55%3A0x1490eacd54859850!2sVIT-AP%20University!5e0!3m2!1sen!2sin!4v1699868952731!5m2!1sen!2sin"
              width="100%"
              height="auto"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <div className="contact-section">
            <div className="contact-info">
              <div>
                <i className="fas fa-map-marker-alt"></i>VIT-AP University, Amaravathi, India
              </div>
              <div>
                <i className="fas fa-envelope"></i>vitap@gmail.com
              </div>
              <div>
                <i className="fas fa-phone"></i>+91 1234567890
              </div>
              <div>
                <i className="fas fa-clock"></i>Mon - Sat 10:00 AM to 8:00 PM
              </div>
            </div>
            <div className="contact-form">
              <h2>Contact Us</h2>
              <form className="contact" action="" method="post">
                <input type="text" name="name" className="text-box" placeholder="Your Name" required />
                <input type="email" name="email" className="text-box" placeholder="Your Email" required />
                <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                <input type="submit" name="submit" className="send-btn" value="Send" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
};

export default Contact;