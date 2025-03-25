import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Account from './components/Account'
import SearchMovies from './components/SearchMovies'
import NotFound from './components/NotFound'
import MoviesContext from './context/MoviesContext'

class App extends Component {
  state = {searchValue: ''}

  setSearchValue = event => {
    const {value} = event.target
    this.setState({searchValue: value})
  }

  render() {
    const {searchValue} = this.state
    return (
      <MoviesContext.Provider
        value={{setSearchValue: this.setSearchValue, searchValue}}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute
            exact
            path="/movies/:movieId"
            component={MovieItemDetails}
          />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute exact path="/search" component={SearchMovies} />
          <Route component={NotFound} />
        </Switch>
      </MoviesContext.Provider>
    )
  }
}

export default App
