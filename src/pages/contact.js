import React from 'react';
import './contact.css'; // Make sure this file exists

function Contact() {
  return (
    <div className="contact-page">
      <div className="container contact-container">
        <h2 className="contact-title">Contact Us</h2>

        <div className="contact-item">
          <span className="contact-icon">📘</span>
          <a
            href="https://www.facebook.com/share/1BdpA3EQAn/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            facebook.com/Cynosure
          </a>
        </div>

        <div className="contact-item">
          <span className="contact-icon">📸</span>
          <a
            href="https://www.instagram.com/cynosure_cy?igsh=MXMxMGYzb3p6Z3Rxeg=="
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            @cynosure_cy
          </a>
        </div>

        <div className="contact-item">
          <span className="contact-icon">📧</span>
          <a href="mailto:info.wearecynosure@gmail.com" className="contact-link">
            info.wearecynosure@gmail.com
          </a>
        </div>

        <div className="contact-item">
          <span className="contact-icon">📞</span>
          <a href="tel:+66820856068" className="contact-link">
            +66 82 085 6068
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;


