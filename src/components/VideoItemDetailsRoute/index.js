import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BiLike, BiDislike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'

import {formatDistanceToNow} from 'date-fns'

import ReactPlayer from 'react-player'

import NavBar from '../NavbarFolder'

import LeftSideNav from '../LeftSideNavBar'

import ThemeContext from '../context/ThemeContext'

import './index.css'

import {
  RightSideVideo,
  DivContainer,
  LikesAndDislikes,
  LikeRightSideFlex,
  ViewsAndYearForVideoDetails,
  LikeButtonVideoDetail,
  DisLikeButtonVideoDetail,
  SaveButtonVideoDetails,
  ImageProfileVideoDetails,
  BottomForVideoDetails,
} from './VideoDetails'

const dataCondition = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADER',
}

class VideoDetails extends Component {
  state = {videoDetailsData: {}, conditionCheck: 'initial'}

  componentDidMount() {
    this.GetVideo()
  }

  GetVideo = async () => {
    this.setState({conditionCheck: dataCondition.loader})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const JwtToken = Cookies.get('jwt_token')
    const Url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(Url, options)
    console.log(response)
    const responseToJson = await response.json()
    console.log(responseToJson)

    if (response.ok === true) {
      const VideoUrl = responseToJson.video_details.video_url
      console.log(VideoUrl)

      const DataOfVideo = {
        videoUrl: responseToJson.video_details.video_url,
        id: responseToJson.video_details.id,
        title: responseToJson.video_details.title,
        thumbNailUrl: responseToJson.video_details.thumbnail_url,
        viewCount: responseToJson.video_details.view_count,
        years: formatDistanceToNow(
          new Date(responseToJson.video_details.published_at),
        ),
        ProfileImage: responseToJson.video_details.channel.profile_image_url,
        channelName: responseToJson.video_details.channel.name,
        subscribers: responseToJson.video_details.channel.subscriber_count,
        description: responseToJson.video_details.description,
      }

      this.setState({
        videoDetailsData: DataOfVideo,
        conditionCheck: dataCondition.success,
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
        We are having some trouble to complete your request. Please try again.
      </p>
      <div>
        <button onClick={this.GetVideo} type="button">
          Retry
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {videoDetailsData} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, savedToThisVideo} = value
          const savedThisVideo = () => {
            savedToThisVideo(videoDetailsData)
          }

          return (
            <div>
              <NavBar />
              <div>
                <RightSideVideo>
                  <LeftSideNav />
                  <DivContainer
                    data-testid="videoItemDetails"
                    const
                    ColorBg={isDarkTheme}
                  >
                    {' '}
                    <ReactPlayer
                      width="100%"
                      height="80%"
                      url={videoDetailsData.videoUrl}
                    />
                    <p>{videoDetailsData.title}</p>
                    <LikesAndDislikes>
                      <ViewsAndYearForVideoDetails>
                        <p>{videoDetailsData.viewCount} views</p>
                        <p>{videoDetailsData.years}</p>
                      </ViewsAndYearForVideoDetails>
                      <LikeRightSideFlex>
                        <div>
                          <LikeButtonVideoDetail type="button">
                            <BiLike /> Like
                          </LikeButtonVideoDetail>
                        </div>
                        <div>
                          <DisLikeButtonVideoDetail type="button">
                            <BiDislike /> Dislike
                          </DisLikeButtonVideoDetail>
                        </div>
                        <div>
                          <SaveButtonVideoDetails
                            const
                            colorTexts={isDarkTheme}
                            onClick={savedThisVideo}
                            type="button"
                          >
                            <CgPlayListAdd /> Save
                          </SaveButtonVideoDetails>
                        </div>
                      </LikeRightSideFlex>
                    </LikesAndDislikes>
                    <hr />
                    <BottomForVideoDetails const Color={isDarkTheme}>
                      <div>
                        <ImageProfileVideoDetails
                          src={videoDetailsData.ProfileImage}
                          alt="channel logo"
                        />
                      </div>
                      <div>
                        <p>{videoDetailsData.channelName}</p>
                        <p>{videoDetailsData.subscribers} subscribers</p>
                        <p>{videoDetailsData.description}</p>
                      </div>
                    </BottomForVideoDetails>
                  </DivContainer>
                </RightSideVideo>
              </div>
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
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    return <div>{this.conditionChecking()}</div>
  }
}

export default VideoDetails
