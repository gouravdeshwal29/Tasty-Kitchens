import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div>
      <img
        src="https://res.cloudinary.com/debsmavvr/image/upload/v1634035306/Zomato%20Clone/erroring_1_ftb5ze.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <Link to="/">
        <button type="button">Home Page</button>
      </Link>
    </div>
  </>
)

export default NotFound
