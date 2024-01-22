import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import ThemeContext from '../context/ThemeContext'

import NavBar from '../NavbarFolder'
import LeftSideNav from '../LeftSideNavBar'

import {DivBg, DivTextSaved} from './saved'

import './index.css'

class SavedVideos extends Component {
  render() {
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {dataOfIdOfEach, savedVideos, isDarkTheme} = value
          console.log(dataOfIdOfEach)
          return (
            <div>
              <NavBar />

              <div className="leftSide-savedVideos">
                <LeftSideNav />
                <DivBg const textColor={isDarkTheme} data-testid="/savedVideos">
                  {/* */}
                  {savedVideos.length === 0 ? (
                    <div className="no-videosFound">
                      <div>
                        <img
                          className="no-videos"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                          alt="no saved videos"
                        />
                      </div>
                      <h2>No saved videos found</h2>
                      <p>You can save your videos while watching them</p>
                    </div>
                  ) : (
                    <div>
                      <div className="logo-Saved">
                        <div>
                          <img
                            className="fire-image"
                            src="https://th.bing.com/th?id=OIP.-ON790xjPtjF_e7FDwAEPQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.7&pid=3.1&rm=2"
                            alt="savedVideo"
                          />
                        </div>
                        <h1>Saved Videos</h1>
                      </div>
                      <ul className="ulForSaved">
                        {savedVideos.map(each => (
                          <Link
                            key={each.id}
                            to={`/videos/${each.id}`}
                            className="savedImageFlexing"
                          >
                            <li key={each.id} className="savedImageFlexing">
                              <div>
                                <img
                                  className="thumbnailSaved"
                                  src={each.thumbNailUrl}
                                  alt="video thumbnail"
                                />
                              </div>
                              <DivTextSaved const color={isDarkTheme}>
                                <p>{each.title}</p>
                                <p>{each.channelName}</p>
                                <div className="viewsSaved">
                                  <p>{each.viewCount} views</p>&nbsp;&nbsp;
                                  <p>{each.years} ago</p>
                                </div>
                              </DivTextSaved>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  )}
                </DivBg>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
