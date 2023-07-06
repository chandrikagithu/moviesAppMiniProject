import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
    passwordType: 'password',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value, showErrorMsg: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showErrorMsg: false})
  }

  togglePassword = () => {
    const {passwordType} = this.state
    if (passwordType === 'password') {
      this.setState({passwordType: 'text'})
      return
    }
    this.setState({passwordType: 'password'})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUser = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="user">
          USERNAME
        </label>

        <input
          type="text"
          id="user"
          className="input-field"
          onChange={this.onChangeUsername}
          value={username}
          placeholder="Username"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password, passwordType} = this.state

    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <div className="input-field">
          <input
            type={passwordType}
            id="password"
            onChange={this.onChangePassword}
            value={password}
            className="input-value-field"
            placeholder="Password"
          />
          <button
            className="btn btn-outline-primary eye-button"
            onClick={this.togglePassword}
            type="button"
          >
            {passwordType === 'password' ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </button>
        </div>
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="website-image-container">
          <img
            src="https://res.cloudinary.com/dytv2vnvt/image/upload/v1688461765/Group_7399_f75pyk.png"
            alt="login website logo"
            className="website-logo"
          />
        </div>
        <form className="login-container" onSubmit={this.submitForm}>
          <h1 className="log-title">Login</h1>
          {this.renderUser()}
          {this.renderPassword()}
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
          <button type="submit" className="sign-btn">
            Sign in
          </button>
        </form>
      </div>
    )
  }
}
export default LoginRoute
