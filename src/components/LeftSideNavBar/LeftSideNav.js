import styled from 'styled-components'

export const LeftSideNavBar = styled.div`
  width: 200px;
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px;
  color: ${props => (props.Colors ? '#ffffff ' : ' #000000 ')};
  background-color: ${props => (props.Colors ? '#0f0f0f ' : ' #f9f9f9 ')};
  background-size: cover;
`
export const FaceBookImage = styled.img`
  height: 25px;
`
export const TwitterImage = styled.img`
  height: 25px;
`
export const LinkdinImage = styled.img`
  height: 25px;
`
export const FaceBookTwitterLinkBg = styled.div`
  display: flex;
  flex-direction: row;
  width: 100px;
  justify-content: space-between;
`
