import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-background-container">
        <div className="form-background-container">
          <div className="form-container">
            <form
              onSubmit={this.submitForm}
              className="form-elements-container"
            >
              <img
                src="https://res.cloudinary.com/debsmavvr/image/upload/v1634025687/Zomato%20Clone/Vector_t1ogt5.png"
                alt="website logo"
                className="app-logo"
              />
              <h1 className="app-name">Tasty Kitchens</h1>
              <h1 className="login-heading">Login</h1>
              <div className="input-container">
                <label htmlFor="username" className="username-input-label">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={this.onChangeUsername}
                  placeholder="Username"
                  className="username-input-field"
                />
                <label htmlFor="password" className="password-input-label">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={this.onChangePassword}
                  placeholder="Password"
                  className="password-input-field"
                />
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/debsmavvr/image/upload/v1634026874/Zomato%20Clone/Rectangle_1456_oldhdx.png"
          alt="website login"
          className="login-page-image"
        />
      </div>
    )
  }
}

export default LoginForm
