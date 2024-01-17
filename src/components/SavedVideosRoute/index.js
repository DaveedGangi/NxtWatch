import {Component} from 'react'

import ThemeContext from '../context/ThemeContext'

import NavBar from '../NavbarFolder'
import LeftSideNav from '../LeftSideNavBar'

class SavedVideos extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {dataOfIdOfEach, savedVideos} = value
          console.log(dataOfIdOfEach)
          return (
            <div>
              <NavBar />
              <LeftSideNav />
              <div data-testid="/savedVideos">
                {/* */}
                <h1>{savedVideos.title}</h1>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
