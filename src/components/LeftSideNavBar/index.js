import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {IoGameController} from 'react-icons/io5'
import {CgPlayListAdd} from 'react-icons/cg'

import {Link} from 'react-router-dom'

import ThemeContext from '../context/ThemeContext'

import {
  LeftSideNavBar,
  FaceBookImage,
  TwitterImage,
  LinkdinImage,
  FaceBookTwitterLinkBg,
} from './LeftSideNav'

import './index.css'

const LeftSideNav = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      return (
        <div>
          <LeftSideNavBar const Colors={isDarkTheme}>
            <div>
              <div>
                <Link className="link" to="/">
                  <AiFillHome /> Home
                </Link>
              </div>
              <br />
              <div>
                <Link className="link" to="/trending">
                  <HiFire /> Trending
                </Link>
              </div>
              <br />
              <div>
                <Link className="link" to="/gaming">
                  <IoGameController /> Gaming
                </Link>
              </div>
              <br />
              <div>
                <Link className="link" to="/saved-videos">
                  <CgPlayListAdd /> Saved videos
                </Link>
              </div>
            </div>
            <div>
              <p>CONTACT US</p>
              <FaceBookTwitterLinkBg>
                <div>
                  <FaceBookImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                    alt="facebook logo"
                  />
                </div>
                <div>
                  <TwitterImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                    alt="twitter logo"
                  />
                </div>
                <div>
                  <LinkdinImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </div>
              </FaceBookTwitterLinkBg>
              <p>Enjoy! Now to see your channels and recommendations!</p>
            </div>
          </LeftSideNavBar>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default LeftSideNav
