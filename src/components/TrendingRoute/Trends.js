import styled from 'styled-components'

export const DisplayFlexTrending = styled.div`
  display: flex;
`

export const Heading = styled.h1`
  font-family: Roboto;
`
export const ImageTrending = styled.img`
  height: 66px;
`
export const TrendingBg = styled.div`
  background-color: ${props => (props.text ? '#0f0f0f' : '')};
`
export const ParaName = styled.p`
  font-size: 17px;
`
export const UlTrend = styled.ul`
  list-style-type: none;
  height: 500px;
  overflow-y: scroll;
  color: ${props => (props.ulTrend ? '#f9f9f9' : ' #0f0f0f')};
`
export const ListsTrend = styled.li`
  color: ${props => (props.ulTrend ? '#f9f9f9' : ' #0f0f0f')};
  display: flex;
  margin-bottom: 12px;
`
