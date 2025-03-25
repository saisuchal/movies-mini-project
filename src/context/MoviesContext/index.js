import React from 'react'

const MoviesContext = React.createContext({
  setSearchValue: () => {},
  searchValue: '',
})

export default MoviesContext
