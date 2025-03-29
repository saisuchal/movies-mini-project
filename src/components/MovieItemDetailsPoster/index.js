import {format} from 'date-fns'
import './index.css'

const MovieItemDetailsPoster = props => {
  const {movieDetails} = props

  const {
    title,
    overview,
    posterPath,
    runtime,
    adult,
    releaseDate,
  } = movieDetails
  const formatYear = date => {
    const year = format(new Date(date), 'yyyy')
    return year
  }
  const formatTime = time => {
    const hours = Math.floor(time / 60)
    const minutes = time % 60
    return `${hours}h ${minutes}m`
  }
  return (
    <div
      className="movie-details-poster"
      style={{
        backgroundImage: `linear-gradient( 180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%), url(${posterPath})`,
        backgroundSize: 'cover',
      }}
    >
      <h1 className="details-title">{title}</h1>
      <div className="movie-details-info">
        <p>{formatTime(runtime)}</p>
        <p className="rating-div">{adult ? 'A' : 'U/A'}</p>
        <p>
          {releaseDate}|{formatYear(releaseDate)}
        </p>
      </div>
      <div className="details-overview-div">
        <p className="details-overview">{overview}</p>
      </div>
      <button type="button" className="play-button">
        Play
      </button>
    </div>
  )
}
export default MovieItemDetailsPoster
