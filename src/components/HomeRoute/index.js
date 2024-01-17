import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

import {Redirect, Link} from 'react-router-dom'

import {IoMdClose} from 'react-icons/io'
import {MdSearch} from 'react-icons/md'

import NavBar from '../NavbarFolder'

import LeftSideNav from '../LeftSideNavBar'

import ThemeContext from '../context/ThemeContext'
import './index.css'

import {
  DisplayFlexHomeRow,
  RightSideViewHome,
  BannerContainer,
  WebSiteImageForBanner,
  BannerColumnText,
  GetItNow,
  ButtonClose,
  InputSearch,
  LabelForSearch,
  ButtonSearch,
  ImageProfileNameHome,
  ProfileAndTitle,
  ImageThumbNail,
  VideosContainer,
  ViewAndYearFlex,
} from './Home'

const dataCondition = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADER',
}

class Home extends Component {
  state = {
    Banner: false,
    videosStore: [],
    inputValue: '',
    conditionCheck: 'initial',
  }

  componentDidMount() {
    this.showVideos()
  }

  showVideos = async () => {
    this.setState({conditionCheck: dataCondition.loader})
    const JwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/all?search='
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const responseToJson = await response.json()

      console.log(responseToJson)
      const videosAll = responseToJson.videos.map(each => ({
        channelName: each.channel.name,
        id: each.id,
        profileImage: each.channel.profile_image_url,
        thumbNailUrl: each.thumbnail_url,
        title: each.title,
        views: each.view_count,
        years: formatDistanceToNow(new Date(each.published_at)),
      }))
      this.setState({
        videosStore: videosAll,
        conditionCheck: dataCondition.success,
      })
    } else {
      this.setState({conditionCheck: dataCondition.failure})
    }
  }

  CloseBanner = () => {
    this.setState({Banner: true})
  }

  showBanner = () => (
    <BannerContainer data-testid="banner">
      <BannerColumnText>
        <div>
          <WebSiteImageForBanner
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
        </div>
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <div>
          <GetItNow type="button">GET IT NOW</GetItNow>
        </div>
      </BannerColumnText>
      <div>
        <ButtonClose
          data-testid="close"
          onClick={this.CloseBanner}
          type="button"
        >
          <IoMdClose />
          {/* */}
        </ButtonClose>
      </div>
    </BannerContainer>
  )

  PassId = event => {
    console.log(event)
  }

  inputStore = event => {
    this.setState({inputValue: event.target.value})
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failureView"
        />
      </div>
      <p>Oops! Something Went Wrong</p>
      <p>
        We are having some trouble to complete your request Please try again.
      </p>
      <div>
        <button type="button">Retry</button>
      </div>
    </div>
  )

  notFound = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
      </div>
      <p>No Search results found</p>
      <p>Try different key words or remove search filter</p>
      <div>
        <button type="button">Retry</button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {videosStore, inputValue} = this.state
    console.log(inputValue)

    const VideosAllData = videosStore.filter(each =>
      each.title.toLowerCase().includes(inputValue.toLowerCase()),
    )

    if (VideosAllData.length === 0) {
      return this.notFound()
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <VideosContainer const textColor={isDarkTheme}>
              {VideosAllData.map(each => (
                <Link className="Link" to={`/videos/${each.id}`} key={each.id}>
                  <div>
                    <div>
                      <ImageThumbNail
                        src={each.thumbNailUrl}
                        alt={each.thumbNailUrl}
                      />
                    </div>
                    <ProfileAndTitle const textColors={isDarkTheme}>
                      <div>
                        <ImageProfileNameHome
                          src={each.profileImage}
                          alt={each.profileImage}
                        />
                      </div>
                      <div>
                        <p>{each.title}</p>
                        <p>{each.channelName}</p>
                        <ViewAndYearFlex>
                          <p>{each.views} views</p>
                          <p>{each.years} ago</p>
                        </ViewAndYearFlex>
                      </div>
                    </ProfileAndTitle>
                  </div>
                </Link>
              ))}
            </VideosContainer>
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
    const JwtTokens = Cookies.get('jwt_token')
    if (JwtTokens === undefined) {
      return <Redirect to="/login" />
    }

    const {Banner, inputValue} = this.state
    console.log(inputValue)

    const BannerShowOrNot = Banner ? null : this.showBanner()
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div>
              <NavBar />
              <DisplayFlexHomeRow>
                <LeftSideNav />

                <RightSideViewHome data-testid="home" const text={isDarkTheme}>
                  <div>
                    {BannerShowOrNot}
                    <div>
                      <InputSearch
                        onChange={this.inputStore}
                        id="Search"
                        placeholder="Search"
                        type="search"
                      />
                      <LabelForSearch htmlFor="Search">
                        <ButtonSearch data-testid="searchButton" type="button">
                          <MdSearch />
                          {/* */}
                        </ButtonSearch>
                      </LabelForSearch>
                    </div>
                    {/* videos */}
                    {this.conditionChecking()}
                  </div>
                </RightSideViewHome>
              </DisplayFlexHomeRow>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
