import styled from 'styled-components'

export const DisplayFlexGaming = styled.div`
  display: flex;
  flex-direction: row;
`

export const Heading = styled.h1`
  font-family: Roboto;
  color: ${props => (props.colorHeadingGame ? '#f9f9f9' : '#0f0f0f ')};
`
export const GamingStore = styled.div`
  background-color: ${props => (props.text ? '#0f0f0f' : '#ffffff')};

  background-size: cover;
`
export const ImageGame = styled.img`
  height: 55px;
  border-radius: 50px;
  margin-top: 17px;
  height: 40px;
`
export const UlGame = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 500px;
  overflow-y: scroll;
  list-style-type: none;
`
export const Lists = styled.li`
  color: ${props => (props.listsColors ? '#f9f9f9' : '#0f0f0f ')};
`
