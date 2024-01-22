import styled from 'styled-components'

export const DivBg = styled.div`
  width: 100%;
  padding: 12px;
  overflow-y: scroll;
  height: 580px;
  background-color: ${props => (props.textColor ? ' #212121' : '#ffffff')};
  color: ${props => (props.textColor ? '#f9f9f9' : '#0f0f0f')};
`

export const DivTextSaved = styled.div`
  color: ${props => (props.color ? '#f9f9f9' : '#0f0f0f')};
`
