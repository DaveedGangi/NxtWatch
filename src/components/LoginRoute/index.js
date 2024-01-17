import {Component} from 'react'

import Cookies from 'js-cookie'

import {
  BgLoginAll,
  BgForLoginCard,
  ImageLoginDiv,
  ImgForLogin,
  LoginButton,
  InputUserName,
  InputPassword,
  LabelForUserName,
  LabelForPassword,
  InputCheckBox,
  LabelForShowPassword,
  ErrorMsg,
  FormContainer,
} from './styledComponent'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    conditionToShowPassword: false,
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
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
    const responsive = await response.json()
    console.log(responsive.jwt_token)
    console.log(response)
    console.log(response.ok)
    if (response.ok === true) {
      this.successLogin(responsive.jwt_token)
    } else {
      const responseToJsonFormat = await response.json()
      console.log(responseToJsonFormat)
      this.setState({errorMsg: responseToJsonFormat.error_msg})
    }
  }

  sendInputUserName = event => {
    this.setState({username: event.target.value})
  }

  sendInputPassword = event => {
    this.setState({password: event.target.value})
  }

  checkBox = () => {
    this.setState(prevState => ({
      conditionToShowPassword: !prevState.conditionToShowPassword,
    }))
  }

  render() {
    const {username, password, errorMsg, conditionToShowPassword} = this.state
    console.log(username)
    console.log(password)

    const changeInputPasswordToText = conditionToShowPassword
      ? 'text'
      : 'password'
    return (
      <BgLoginAll>
        <BgForLoginCard>
          <ImageLoginDiv>
            <ImgForLogin
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </ImageLoginDiv>
          <br />

          <FormContainer onSubmit={this.submitForm}>
            <LabelForUserName htmlFor="UserName">USERNAME</LabelForUserName>
            <br />
            <InputUserName
              placeholder="Username"
              type="text"
              id="UserName"
              onChange={this.sendInputUserName}
            />
            <br />
            <br />
            <LabelForPassword htmlFor="PasswordLabel">
              PASSWORD
            </LabelForPassword>
            <br />
            <InputPassword
              placeholder="Password"
              type={changeInputPasswordToText}
              id="PasswordLabel"
              onChange={this.sendInputPassword}
            />
            <br />
            <br />
            <InputCheckBox
              onClick={this.checkBox}
              type="checkbox"
              id="CheckBoxInputAndPassword"
            />
            <LabelForShowPassword htmlFor="CheckBoxInputAndPassword">
              Show Password
            </LabelForShowPassword>

            <br />
            <br />
            <div>
              <LoginButton type="submit">Login</LoginButton>
            </div>
            <ErrorMsg>{errorMsg}</ErrorMsg>
          </FormContainer>
        </BgForLoginCard>
      </BgLoginAll>
    )
  }
}
export default Login
