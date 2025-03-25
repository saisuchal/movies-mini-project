import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import MovieItem from '../MovieItem'
import Footer from '../Footer'
import MoviesContext from '../../context/MoviesContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchMovies extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchData: [],
  }

  componentDidMount() {
    this.fetchSearchData()
  }

  fetchSearchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {location} = this.props
    const searchParamsObject = new URLSearchParams(location.search)
    const searchParams = searchParamsObject.get('search')
    const searchUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchParams}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const searchResponse = await fetch(searchUrl, options)
      const search = await searchResponse.json()
      if (searchResponse.ok) {
        const searchData = this.searchCamelCase(search.results)
        this.setState({
          apiStatus: apiStatusConstants.success,
          searchData,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  searchCamelCase = data => {
    const transformedData = data.map(item => ({
      backdropPath: item.backdrop_path,
      id: item.id,
      posterPath: item.poster_path,
      title: item.title,
    }))
    return transformedData
  }

  renderSearchResultsView = () => (
    <MoviesContext.Consumer>
      {value => {
        const {searchData} = this.state
        const {searchValue} = value
        const SearchResults = () => (
          <ul className="search-list">
            {searchData.map(eachMovie => (
              <MovieItem movie={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        )
        const NoResults = () => (
          <div className="no-movies">
            <img
              src="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742729638/Group_7394_ts3m0y.png"
              alt="no movies"
            />
            <p>Your search for {searchValue} did not find any matches.</p>
          </div>
        )
        return searchData.length === 0 ? <NoResults /> : <SearchResults />
      }}
    </MoviesContext.Consumer>
  )

  renderSearchResults = () => {
    const {apiStatus} = this.state
    switch (true) {
      case apiStatus === apiStatusConstants.success:
        return this.renderSearchResultsView()
      case apiStatus === apiStatusConstants.inProgress:
        return <LoaderView height="80vh" />
      case apiStatus === apiStatusConstants.failure:
        return (
          <FailureView
            height="80vh"
            retry={this.fetchData}
            imageHeight="40vh"
            imgUrl="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742840933/Background-Complete_nhwfz2.png"
          />
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-page">
        <Header position="none" />
        <div>{this.renderSearchResults()}</div>
        <Footer />
      </div>
    )
  }
}

export default SearchMovies
