import {format} from 'date-fns'
import React, {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import MovieItemDetailsPoster from '../MovieItemDetailsPoster'
import MovieItem from '../MovieItem'
import Footer from '../Footer'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieDetailsData: {},
    detailsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    console.log('update')
    const {match} = this.props
    const {params} = match
    const {movieId} = params
    console.log(movieId)
    if (movieId !== prevProps.match.params.movieId) {
      console.log('reload')
      window.location.reload()
    }
  }

  fetchData = async () => {
    this.setState({
      detailsApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {movieId} = params
    const movieDetailsUrl = `https://apis.ccbp.in/movies-app/movies/${movieId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const movieDetailsResponse = await fetch(movieDetailsUrl, options)
    const movieDetails = await movieDetailsResponse.json()
    try {
      if (movieDetailsResponse.ok) {
        const movieDetailsData = this.camelCase(movieDetails.movie_details)
        this.setState({
          movieDetailsData,
          detailsApiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({detailsApiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      console.log(e)
      this.setState({detailsApiStatus: apiStatusConstants.failure})
    }
  }

  camelCase = item => {
    const transformedData = {
      backdropPath: item.backdrop_path,
      id: item.id,
      overview: item.overview,
      posterPath: item.poster_path,
      title: item.title,
      adult: item.adult,
      budget: item.budget,
      genres: item.genres,
      releaseDate: item.release_date,
      runtime: item.runtime,
      similarMovies: item.similar_movies,
      spokenLanguages: item.spoken_languages,
      voteAverage: item.vote_average,
      voteCount: item.vote_count,
    }
    return transformedData
  }

  audioList = (list, title) => (
    <div>
      <h1 className="detail-heading">{title}</h1>
      <ul className="detail-list">
        {list.map(item => {
          const language = item.english_name
          return (
            <li key={item.id} className="detail-list-item">
              <p>{language}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )

  similarMovieList = (list, title) => (
    <div>
      <h1 className="detail-heading">{title}</h1>
      <ul className="detail-list">
        {list.map(item => {
          const movieTitle = item
          return (
            <li key={item.id} className="detail-list-item">
              <p>{movieTitle}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )

  genreList = (list, title) => (
    <div>
      <h1 className="detail-heading">{title}</h1>
      <ul className="detail-list">
        {list.map(item => {
          const genre = item.name
          return (
            <li key={item.id} className="detail-list-item">
              <p>{genre}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )

  genericList = (value, title) => (
    <div>
      <h1 className="detail-heading">{title}</h1>
      <ul className="detail-list">
        <li className="detail-list-item">
          <p>{value}</p>
        </li>
      </ul>
    </div>
  )

  formatSimilarMoviesList = data => {
    const transformedData = data.map(item => ({
      backdropPath: item.backdrop_path,
      id: item.id,
      posterPath: item.poster_path,
      title: item.title,
    }))
    return transformedData
  }

  formatDate = releaseDate => {
    const [year, month, date] = releaseDate.split('-')
    const formattedDate = format(new Date(year, month, date), 'do MMMM yyyy')
    return formattedDate
  }

  movieDetailsView = () => {
    const {detailsApiStatus, movieDetailsData} = this.state
    const {
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
      releaseDate,
      similarMovies,
    } = movieDetailsData
    switch (true) {
      case detailsApiStatus === apiStatusConstants.success:
        return (
          <>
            <MovieItemDetailsPoster
              movieDetails={movieDetailsData}
              apiStatus={detailsApiStatus}
              page="details"
            />
            <div className="movie-details">
              {this.genreList(genres, 'Genres')}
              {this.audioList(spokenLanguages, 'Audio Available')}
              {this.genericList(voteCount, 'Rating Count')}
              {this.genericList(voteAverage, 'Rating Average')}
              {this.genericList(budget, 'Budget')}
              {this.genericList(this.formatDate(releaseDate), 'Release Date')}
            </div>
            <h1 className="details-title" style={{paddingLeft: '7vw'}}>
              More Like This
            </h1>
            <ul className="similar-movies">
              {this.formatSimilarMoviesList(similarMovies.slice(0, 6)).map(
                eachMovie => (
                  <MovieItem
                    movie={eachMovie}
                    key={eachMovie.id}
                    onClick={this.reloadPage}
                  />
                ),
              )}
            </ul>
          </>
        )
      case detailsApiStatus === apiStatusConstants.inProgress:
        return <LoaderView height="50vh" />
      case detailsApiStatus === apiStatusConstants.failure:
        return (
          <FailureView
            height="80vh"
            retry={this.fetchData}
            imageHeight="30vh"
            imgUrl="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742840933/Background-Complete_nhwfz2.png"
          />
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="details-page">
        <Header position="absolute" />
        {this.movieDetailsView()}
        <Footer />
      </div>
    )
  }
}

export default MovieItemDetails
