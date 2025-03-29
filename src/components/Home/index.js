import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import RandomMovie from '../RandomMovie'
import MovieSlider from '../MovieSlider'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    trendingData: [],
    originalsData: [],
    randomMovie: {},
    trendingApiStatus: apiStatusConstants.initial,
    originalsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchTrending()
    this.fetchOriginals()
  }

  fetchTrending = async () => {
    this.setState({
      trendingApiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const trendingResponse = await fetch(trendingUrl, options)
    const trending = await trendingResponse.json()
    if (trendingResponse.ok) {
      const trendingData = this.camelCase(trending.results)
      this.setState({
        trendingData,
        trendingApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: apiStatusConstants.failure})
    }
  }

  fetchOriginals = async () => {
    this.setState({
      originalsApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const originalsUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const originalsResponse = await fetch(originalsUrl, options)
    const originals = await originalsResponse.json()
    if (originalsResponse.ok) {
      const originalsData = this.camelCase(originals.results)
      const randomMovie =
        originalsData[Math.floor(Math.random() * originalsData.length)]
      this.setState({
        originalsData,
        randomMovie,
        originalsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({originalsApiStatus: apiStatusConstants.failure})
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

  render() {
    const {
      randomMovie,
      trendingApiStatus,
      originalsApiStatus,
      trendingData,
      originalsData,
    } = this.state
    return (
      <div className="home-page">
        <Header position="absolute" />
        <RandomMovie
          randomMovie={randomMovie}
          apiStatus={originalsApiStatus}
          retry={this.fetchOriginals}
        />
        <div className="slides-div">
          <MovieSlider
            data={trendingData}
            heading="Trending Now"
            apiStatus={trendingApiStatus}
            retry={this.fetchTrending}
          />
          <MovieSlider
            data={originalsData}
            heading="Originals"
            apiStatus={originalsApiStatus}
            retry={this.fetchOriginals}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
