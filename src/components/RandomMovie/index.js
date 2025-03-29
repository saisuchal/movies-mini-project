import './index.css'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const RandomMovie = props => {
  const {randomMovie, apiStatus, retry} = props
  const {title, overview, posterPath} = randomMovie
  const randomMovieView = (
    <div
      className="random-movie"
      style={{
        backgroundImage: `linear-gradient( 180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%), url(${posterPath})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="random-overview-div">
        <h1 className="random-title">{title}</h1>
        <p className="random-overview">{overview}</p>
        <button type="button" className="play-button">
          Play
        </button>
      </div>
    </div>
  )

  switch (true) {
    case apiStatus === apiStatusConstants.success:
      return randomMovieView
    case apiStatus === apiStatusConstants.failure:
      return (
        <FailureView
          height="50vh"
          retry={retry}
          imageHeight="5vh"
          imgUrl="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742640688/alert-triangle_ue3kkq.png"
        />
      )
    case apiStatus === apiStatusConstants.inProgress:
      return <LoaderView height="50vh" />
    default:
      return null
  }
}
export default RandomMovie
