import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import MovieItem from '../MovieItem'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {popularData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const popularUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const popularResponse = await fetch(popularUrl, options)
      const popular = await popularResponse.json()
      if (popularResponse.ok) {
        const popularData = this.camelCase(popular.results)
        this.setState({popularData, apiStatus: apiStatusConstants.success})
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  camelCase = data => {
    const transformedData = data.map(item => ({
      backdropPath: item.backdrop_path,
      id: item.id,
      overview: item.overview,
      posterPath: item.poster_path,
      title: item.title,
    }))
    return transformedData
  }

  renderPopularView = () => {
    const {apiStatus, popularData} = this.state
    const popularView = (
      <ul className="popular-list">
        {popularData.map(eachMovie => (
          <MovieItem movie={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    )

    switch (true) {
      case apiStatus === apiStatusConstants.success:
        return popularView
      case apiStatus === apiStatusConstants.inProgress:
        return <LoaderView height="80vh" />
      case apiStatus === apiStatusConstants.failure:
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
      <div className="popular-page">
        <Header position="none" />
        <div>{this.renderPopularView()}</div>
        <Footer />
      </div>
    )
  }
}

export default Popular
