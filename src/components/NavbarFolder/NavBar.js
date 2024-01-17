import styled from 'styled-components'

export const NavBg = styled.div`
  display: flex;
  flex-flex-direction: row;
  justify-content: space-between;
  padding: 22px;
  width: 1200px;
  background-color: ${props => (props.text ? '#181818' : '#f9f9f9 ')};
`

export const ProfileImage = styled.img`
  height: 25px;
`
export const RightSideNavBarLogout = styled.div`
  display: flex;
  width: 200px;
  flex-direction: row;
  justify-content: space-between;
`
export const WebSiteLeftSideImageTopNavBar = styled.img`
  height: 33px;
`
export const LogOutButton = styled.button`
  border: 1px solid #3b82f6;
  background-color: #ffffff;
  color: #3b82f6;
  width: 70px;
  height: 23px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
`
export const DarkModeImage = styled.img`
  height: 23px;
`
export const DarkModeButton = styled.button`
  border: 0px;
  background-color: ${props => (props.text ? '#181818' : '#ffffff')};
  cursor: pointer;
`
export const LeftSideNavBar = styled.div`
  width: 200px;
  height: 87vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px;
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

export const LogoutPopUp = styled.div`
  width: 300px;
  height: 200px;
  box-shadow: 0px 4px 8px 0px #e2e8f0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`

export const ButtonLogoutFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 230px;
  margin-top: 22px;
`
export const ConfirmLogout = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  border: 0px;
  width: 100px;
  height: 33px;
  border-radius: 4px;
  cursor: pointer;
`
export const CancelButton = styled.button`
  width: 100px;
  height: 33px;
  border-radius: 4px;
  cursor: pointer;
`
