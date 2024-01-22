import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {formatDistanceToNow} from 'date-fns'

import NavBar from '../NavbarFolder'

import LeftSideNav from '../LeftSideNavBar'

import './index.css'

import {
  DisplayFlexTrending,
  Heading,
  ImageTrending,
  TrendingBg,
  UlTrend,
  ListsTrend,
} from './Trends'

import ThemeContext from '../context/ThemeContext'

const dataCondition = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADER',
}

class Trending extends Component {
  state = {TrendingVideos: [], conditionCheck: 'initial'}

  componentDidMount() {
    this.GetTrendingVideos()
  }

  GetTrendingVideos = async () => {
    this.setState({conditionCheck: dataCondition.loader})
    const jwtToken = Cookies.get('jwt_token')
    const Url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(Url, options)
    console.log(response)
    const responseToJson = await response.json()
    console.log(responseToJson)
    if (response.ok === true) {
      const TrendingVideosAll = responseToJson.videos.map(each => ({
        thumbNailUrl: each.thumbnail_url,
        id: each.id,
        title: each.title,
        channelName: each.channel.name,
        viewsCount: each.view_count,
        year: formatDistanceToNow(new Date(each.published_at)),
      }))

      this.setState({
        conditionCheck: dataCondition.success,
        TrendingVideos: TrendingVideosAll,
      })
    } else {
      this.setState({conditionCheck: dataCondition.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="green" height="50" width="50" />
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
        <button onClick={this.GetTrendingVideos} type="button">
          Retry
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {TrendingVideos} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div>
              <ul className="UL">
                <li>
                  <ImageTrending
                    src="https://media.istockphoto.com/photos/human-crowd-forming-bar-graph-and-arrow-finance-concept-picture-id1135795513?k=6&m=1135795513&s=170667a&w=0&h=bRk0C_9QbqSWeaSF5yumhHTqafwQgAPvatUvwhpLY9w="
                    alt="trending"
                  />
                </li>
                <li>
                  {' '}
                  <Heading>Trending</Heading>
                </li>
              </ul>

              <UlTrend const ulTrend={isDarkTheme}>
                {TrendingVideos.map(each => (
                  <Link
                    className="link"
                    to={`/videos/${each.id}`}
                    key={each.id}
                  >
                    <ListsTrend const ulTrend={isDarkTheme} key={each.id}>
                      <div>
                        <img
                          className="trendImage"
                          src={each.thumbNailUrl}
                          alt="video thumbnail"
                        />
                      </div>
                      <div>
                        <p>{each.title}</p>

                        <p>{each.channelName}</p>

                        <div>
                          <p>{each.viewsCount}</p>
                          <p>{each.year}</p>
                        </div>
                      </div>
                    </ListsTrend>
                  </Link>
                ))}
              </UlTrend>
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
              <DisplayFlexTrending>
                <LeftSideNav />
                <TrendingBg const text={isDarkTheme} data-testid="trending">
                  {this.conditionChecking()}

                  {/*      <ul>
                    <li>
                      <ImageTrending
                        src="https://media.istockphoto.com/photos/human-crowd-forming-bar-graph-and-arrow-finance-concept-picture-id1135795513?k=6&m=1135795513&s=170667a&w=0&h=bRk0C_9QbqSWeaSF5yumhHTqafwQgAPvatUvwhpLY9w="
                        alt="trending"
                      />
                    </li>
                    <li>
                      {' '}
                      <Heading>Trending</Heading>
                    </li>
                  </ul>

                  <ul>
                    {TrendingVideos.map(each => (
                      <Link to={`/videos/${each.id}`} key={each.id}>
                        <li>
                          <div>
                            <img
                              src={each.thumbNailUrl}
                              alt={each.thumbNailUrl}
                            />
                          </div>
                          <div>
                            <p>{each.title}</p>
                            <p>{each.name}</p>
                            <div>
                              <p>{each.viewsCount}</p>
                              <p>{each.year}</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>
               
               */}
                </TrendingBg>
              </DisplayFlexTrending>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
