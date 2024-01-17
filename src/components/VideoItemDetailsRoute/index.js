import {Component} from 'react'

import Cookies from 'js-cookie'

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

class VideoDetails extends Component {
  state = {videoDetailsData: []}

  componentDidMount() {
    this.GetVideo()
  }

  GetVideo = async () => {
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
    const VideoUrl = responseToJson.video_details.video_url
    console.log(VideoUrl)

    const DataOfVideo = {
      videoUrl: responseToJson.video_details.video_url,
      id: responseToJson.video_details.id,
      title: responseToJson.video_details.title,
      viewCount: responseToJson.video_details.view_count,
      years: formatDistanceToNow(
        new Date(responseToJson.video_details.published_at),
      ),
      ProfileImage: responseToJson.video_details.channel.profile_image_url,
      channelName: responseToJson.video_details.channel.name,
      subscribers: responseToJson.video_details.channel.subscriber_count,
      description: responseToJson.video_details.description,
    }

    this.setState({videoDetailsData: DataOfVideo})
  }

  render() {
    const {videoDetailsData} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

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
                          <SaveButtonVideoDetails type="button">
                            <CgPlayListAdd /> Save
                          </SaveButtonVideoDetails>
                        </div>
                      </LikeRightSideFlex>
                    </LikesAndDislikes>
                    <hr />
                    <BottomForVideoDetails>
                      <div>
                        <ImageProfileVideoDetails
                          src={videoDetailsData.ProfileImage}
                          alt={videoDetailsData.ProfileImage}
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
}
export default VideoDetails
