import './index.css'

import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <img
      src="https://res.cloudinary.com/debsmavvr/image/upload/v1634025687/Zomato%20Clone/Vector_t1ogt5.png"
      alt="website-footer-logo"
    />
    <h1 className="footer-heading">Tasty Kitchen</h1>
    <p className="footer-caption">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-icons-container">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        size="30px"
        className="pinterest-icon"
      />
      <FaInstagram
        testid="instagram-social-icon"
        size="30px"
        className="instagram-icon"
      />
      <FaTwitter
        testid="twitter-social-icon"
        size="30px"
        className="twitter-icon"
      />
      <FaFacebookSquare
        testid="facebook-social-icon"
        size="30px"
        className="facebook-icon"
      />
    </div>
  </div>
)

export default Footer
