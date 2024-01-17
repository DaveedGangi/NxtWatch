import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/LoginRoute'
import Home from './components/HomeRoute'

import VideoDetails from './components/VideoItemDetailsRoute'
import Trending from './components/TrendingRoute'
import GamingVideo from './components/GamingRoute'
import SavedVideos from './components/SavedVideosRoute'
import ThemeContext from './components/context/ThemeContext'
import NotFound from './components/NotFoundRoute'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
    dataOfIdEach: '',
    savedVideos: [],
    isBanner: true,
  }

  addToSavedVideos = videoDetails => {
    const {savedVideos} = this.state
    const videosObject = savedVideos.find(each => each.id === videoDetails)

    if (videosObject) {
      this.setState(prev => ({savedVideos: [...prev.savedVideos]}))
    } else {
      this.setState({savedVideos: [...savedVideos, videoDetails]})
    }
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  DataOfId = id => {
    console.log(`DataOfId: ${id}`)
    this.setState({dataOfIdEach: id})
  }

  render() {
    const {
      isDarkTheme,
      dataOfIdEach,
      storageSaved,
      savedVideos,
      isBanner,
    } = this.state
    console.log(dataOfIdEach)
    return (
      <ThemeContext.Provider
        value={{
          storageSaved,
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          DataOfId: this.DataOfId,
          dataOfIdEach,
          savedVideos,
          isBanner,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/videos/:id" component={VideoDetails} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={GamingVideo} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
