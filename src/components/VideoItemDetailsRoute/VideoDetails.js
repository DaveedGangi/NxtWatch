import styled from 'styled-components'

export const RightSideVideo = styled.div`
  display: flex;
`

export const DivContainer = styled.div`
  color: Green;
  overflow-y:scroll;
  background-color: ${props => (props.ColorBg ? '#0f0f0f' : '#f9f9f9')};
  color:${props => (props.ColorBg ? '#f9f9f9' : ' #0f0f0f')}
  height:580px;
  width:100%:
`
export const LikesAndDislikes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 900px;
`
export const LikeRightSideFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
  margin-top: 20px;
`
export const ViewsAndYearForVideoDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
`
export const LikeButtonVideoDetail = styled.button`
  border: 0px;
  background-color: transparent;
  color: blue;
`
export const DisLikeButtonVideoDetail = styled.button`
  border: 0px;
  background-color: transparent;
  color: blue;
`
export const SaveButtonVideoDetails = styled.button`
  border: 0px;
  background-color: transparent;
  color: ${props => (props.colorTexts ? '#f9f9f9' : '#0f0f0f')};
  cursor: pointer;
`
export const ImageProfileVideoDetails = styled.img`
  height: 44px;
  margin-top: 22px;
  margin-right: 18px;
`
export const BottomForVideoDetails = styled.div`
  display: flex;
  color: ${props => (props.Color ? '#f9f9f9' : '#0f0f0f')};
`
