import React from 'react'

const MoviesContext = React.createContext({
  detailsApiStatus: '',
  updateDetailsState: () => {},
})

export default MoviesContext
