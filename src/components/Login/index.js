import {Component} from 'react'
import {FaEye} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  showPassword = event => {
    event.preventDefault()
    const {password} = this.state
    const passwordElement = document.getElementById('password')
    if (password.length !== 0) {
      if (passwordElement.type === 'password') {
        passwordElement.type = 'text'
      } else {
        passwordElement.type = 'password'
      }
    } else {
      passwordElement.type = 'password'
    }
  }

  login = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const token = data.jwt_token
      Cookies.set('jwt_token', token, {expires: 7})
      Cookies.set('username', username, {expires: 7})
      Cookies.set('pwdLength', password.length, {expires: 7})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMessage = data.error_msg
      this.setState({errorMessage})
      document.getElementById('errorMessage').style.visibility = 'visible'
    }
  }

  setUsername = event => {
    const username = event.target.value
    this.setState({username})
  }

  setPassword = event => {
    const password = event.target.value
    this.setState({password})
  }

  render() {
    const {errorMessage} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <img
          className="movies-logo"
          alt="login website logo"
          src="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742401427/Group_7399_1_zeb2ia.png"
        />
        <div className="login-form-div">
          <h1 className="login-heading">Login</h1>
          <form className="login-form" onSubmit={this.login}>
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input-box"
              onChange={this.setUsername}
            />
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <div className="input-box">
              <input
                id="password"
                type="password"
                className="password-box"
                onChange={this.setPassword}
              />
              <button
                type="button"
                className="show-password-button"
                onClick={this.showPassword}
              >
                <FaEye />
              </button>
            </div>
            <p className="error-message" id="errorMessage">
              {errorMessage}
            </p>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
