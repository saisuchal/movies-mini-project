import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <footer className="footer">
    <div className="social-handles-div">
      <button className="social-button" type="button">
        <FaGoogle className="social-handles-icon" />
      </button>
      <button className="social-button" type="button">
        <FaTwitter className="social-handles-icon" />
      </button>
      <button className="social-button" type="button">
        <FaInstagram className="social-handles-icon" />
      </button>
      <button className="social-button" type="button">
        <FaYoutube className="social-handles-icon" />
      </button>
    </div>
    <p>Contact Us</p>
  </footer>
)

export default Footer
