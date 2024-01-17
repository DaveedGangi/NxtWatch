import {Component} from 'react'

import Popup from 'reactjs-popup'

import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import ThemeContext from '../context/ThemeContext'

import {
  NavBg,
  ProfileImage,
  RightSideNavBarLogout,
  WebSiteLeftSideImageTopNavBar,
  LogOutButton,
  DarkModeImage,
  DarkModeButton,
  LogoutPopUp,
  ButtonLogoutFlex,
  ConfirmLogout,
  CancelButton,
} from './NavBar'

class NavBar extends Component {
  removeCookie = () => {
    const {history} = this.props
    const UserCookie = Cookies.get('jwt_token')
    console.log(UserCookie)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value
          const webSiteImageTop = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const DarkModeImages = isDarkTheme
            ? 'https://static.vecteezy.com/system/resources/previews/000/564/551/non_2x/sun-icon-vector.jpg'
            : 'https://cdn-icons-png.flaticon.com/128/66/66275.png'

          const ChangeDarkAndLightMode = () => {
            toggleTheme()
          }
          return (
            <div>
              <NavBg const text={isDarkTheme}>
                <Link to="/">
                  <WebSiteLeftSideImageTopNavBar
                    src={webSiteImageTop}
                    alt="website logo"
                  />
                </Link>
                <RightSideNavBarLogout>
                  <div>
                    <DarkModeButton
                      const
                      text={isDarkTheme}
                      data-testid="theme"
                      onClick={ChangeDarkAndLightMode}
                    >
                      <DarkModeImage src={DarkModeImages} alt="night" />
                    </DarkModeButton>
                  </div>
                  <div>
                    <ProfileImage
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                    />
                  </div>
                  <div>
                    <Popup
                      modal
                      trigger={
                        <LogOutButton type="button">Logout</LogOutButton>
                      }
                    >
                      {close => (
                        <LogoutPopUp>
                          <p>Are you sure, you want to logout</p>
                          <ButtonLogoutFlex>
                            <div>
                              <CancelButton type="button" onClick={close}>
                                Cancel
                              </CancelButton>
                            </div>
                            <div>
                              <ConfirmLogout
                                onClick={this.removeCookie}
                                type="button"
                              >
                                Confirm
                              </ConfirmLogout>
                            </div>
                          </ButtonLogoutFlex>
                        </LogoutPopUp>
                      )}
                    </Popup>
                  </div>
                </RightSideNavBarLogout>
              </NavBg>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default withRouter(NavBar)
