// Write your JS code here
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    submitError: false,
    errMsg: '',
  }

  //   onSubmitError = a => {
  //     const {submitError} = this.state
  //     this.setState({submitError: true})
  //   }

  onSubmitSuccess = () => {
    const {history} = this.props
    // history.push('/')
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password, submitError, errMsg} = this.state

    // if (username === '' || password === '') {
    //   this.onSubmitError()
    // } else if (username !== '' || password !== '') {
    const userDetails = {username, password}
    const url = ' https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.error_msg)
    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      //   this.onSubmitError(data.error_msg)
      this.setState({submitError: true, errMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {submitError, errMsg} = this.state
    return (
      <div className="login-form-container">
        {/* <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        /> */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png "
          className="login-image"
          alt="website login"
        />

        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {submitError && (
            <div className="p1">
              <p className="error-message">
                {/* *Username and Password didn't match */}
                {errMsg}
              </p>
            </div>
          )}
        </form>
      </div>
    )
  }
}
export default LoginForm
