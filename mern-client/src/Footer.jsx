import React from 'react'
import './Footer.css';
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-4 col-xs-12">
            <div className="single_footer">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Login With Google</a></li>
                <li><a href="#">Login With Microsoft</a></li>
                <li><a href="#">Login With Github</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>Page Link</h4>
              <ul>
                <li><a href="/register">Registration</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/other-login">Other Login</a></li>
                
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>Contact Us</h4>
            
              
                <ul>
                  <li><a href="mailto:yashitz07@gmail.com">yashitz07@gmail.com</a></li>
                </ul>
             
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-xs-12">
            <p className="copyright">Copyright © 2024 <a href="#">SecureDash</a>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer