import styled from 'styled-components'

export const DisplayFlexGaming = styled.div`
  display: flex;
  flex-direction: row;
`

export const Heading = styled.h1`
  font-family: Roboto;
`
export const GamingStore = styled.div`
  background-color: ${props => (props.text ? '#0f0f0f' : '#ffffff')};
`
export const ImageGame = styled.img`
  height: 55px;
`
