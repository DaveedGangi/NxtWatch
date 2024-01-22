import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import NavBar from '../NavbarFolder'

import LeftSideNav from '../LeftSideNavBar'

import {
  DisplayFlexGaming,
  Heading,
  GamingStore,
  ImageGame,
  UlGame,
  Lists,
} from './Gaming'

import ThemeContext from '../context/ThemeContext'

import './index.css'

const dataCondition = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADER',
}

class GamingVideo extends Component {
  state = {GamingVideosAll: [], conditionCheck: 'initial'}

  componentDidMount() {
    this.GamingVideo()
  }

  GamingVideo = async () => {
    this.setState({conditionCheck: dataCondition.loader})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    const responseToJson = await response.json()
    console.log(responseToJson)
    if (response.ok === true) {
      const GamingVideos = responseToJson.videos.map(each => ({
        id: each.id,
        thumbNailUrl: each.thumbnail_url,
        title: each.title,
        viewsCount: each.view_count,
      }))
      this.setState({
        conditionCheck: dataCondition.success,
        GamingVideosAll: GamingVideos,
      })
    } else {
      this.setState({conditionCheck: dataCondition.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#313131" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
        />
      </div>
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request Please try again.
      </p>
      <div>
        <button onClick={this.GamingVideo} type="button">
          Retry
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {GamingVideosAll} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div>
              <ul className="UlUpper">
                <li>
                  <ImageGame
                    src="https://images.pexels.com/photos/2323435/pexels-photo-2323435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Gaming"
                  />
                </li>
                <li>
                  <Heading const colorHeadingGame={isDarkTheme}>
                    Gaming
                  </Heading>
                </li>
              </ul>
              <UlGame const textColoring={isDarkTheme}>
                {GamingVideosAll.map(each => (
                  <Link
                    className="link"
                    to={`/videos/${each.id}`}
                    key={each.id}
                  >
                    <Lists key={each.id} const listsColors={isDarkTheme}>
                      <div>
                        <img
                          className="eachGameImage"
                          src={each.thumbNailUrl}
                          alt="video thumbnail"
                        />
                      </div>
                      <p>{each.title}</p>
                      <p>{each.viewsCount} Watching Worldwide</p>
                    </Lists>
                  </Link>
                ))}
              </UlGame>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  conditionChecking = () => {
    const {conditionCheck} = this.state

    switch (conditionCheck) {
      case 'SUCCESS':
        return this.renderSuccessView()

      case 'FAILURE':
        return this.renderFailureView()

      case 'LOADER':
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    const JwtTokenValue = Cookies.get('jwt_token')
    if (JwtTokenValue === undefined) {
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div>
              <NavBar />
              <DisplayFlexGaming>
                <LeftSideNav />

                <GamingStore const text={isDarkTheme} data-testid="gaming">
                  {this.conditionChecking()}

                  {/*  <ImageGame
                    src="https://images.pexels.com/photos/2323435/pexels-photo-2323435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Gaming"
                  />
                  <Heading>Gaming</Heading>
                  <ul>
                    {GamingVideosAll.map(each => (
                      <Link to={`/videos/${each.id}`} key={each.id}>
                        <li>
                          <div>
                            <img
                              src={each.thumbNailUrl}
                              alt="video thumbnail"
                            />
                          </div>
                          <p>{each.title}</p>
                          <p>{each.viewsCount} Watching Worldwide</p>
                        </li>
                      </Link>
                    ))}
                  </ul>

                  */}
                </GamingStore>
              </DisplayFlexGaming>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default GamingVideo
