import styled from 'styled-components'

export const DisplayFlexHomeRow = styled.div`
  display: flex;
`

export const RightSideViewHome = styled.div`
  height: 100%;
  background-color: ${props => (props.text ? '#181818' : '#f9f9f9 ')};
  background-size: cover;
  padding-left: 8px;
`
export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  width: 970px;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const WebSiteImageForBanner = styled.img`
  height: 43px;
`
export const BannerColumnText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 330px;
  padding-left: 12px;
`
export const GetItNow = styled.button`
  height: 33px;
  width: 100px;
`

export const ButtonClose = styled.button`
  border: 0px;

  background-color: #ffffff;
  margin-top: 18px;

  cursor: pointer;
`
export const InputSearch = styled.input`
  width: 300px;
  height: 26px;
  padding-left: 8px;
  border: 1px solid #cccccc;
  margin-top: 24px;
`
export const LabelForSearch = styled.label`
  background-color: #ffffff;
  margin-top: 2px;
`
export const ButtonSearch = styled.button`
  height: 26px;
  width: 44px;

  border: 1px solid #cccccc;
  border-left: 0px;
  background-color: #ffffff;
`
export const ImageProfileNameHome = styled.img`
  height: 32px;
`
export const ProfileAndTitle = styled.div`
  display: flex;
  width: 270px;
  flex-direction: row;
  justify-content: space-between;
  color: ${props => (props.textColors ? '#ffffff' : '#000000')};
`
export const ImageThumbNail = styled.img`
  height: 180px;
  width: 326px;
  cursor: pointer;
`
export const VideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 22px;
  width: 100%;
  overflow: scroll;
  height: 500px;
  color: ${props => (props.textColor ? '#ffffff' : '#000000')};
`
export const ViewAndYearFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
