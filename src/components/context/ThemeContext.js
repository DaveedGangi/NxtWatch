import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  storageSaved: [],
  addToSavedVideos: () => {},
  removeSaveVideos: () => {},
})

export default ThemeContext
