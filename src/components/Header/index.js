import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="navbar-background-container">
      <div className="logo-and-app-name-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/debsmavvr/image/upload/v1634025687/Zomato%20Clone/Vector_t1ogt5.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <Link to="/" className="name">
          <h1>Tasty Kitchens</h1>
        </Link>
      </div>
      <ul className="nav-list">
        <Link to="/" className="home">
          <li>
            <h1>Home</h1>
          </li>
        </Link>
        <Link to="/cart" className="cart">
          <li>
            <h1>Cart</h1>
          </li>
        </Link>
        <li>
          <button
            type="button"
            onClick={onClickLogout}
            className="logout-button"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
