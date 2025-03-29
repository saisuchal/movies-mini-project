import './index.css'
import {Link} from 'react-router-dom'

const MovieItem = props => {
  const {movie} = props
  const {posterPath, id, title} = movie
  return (
    <li>
      <Link to={`/movies/${id}`} className="poster-div">
        <img className="poster" src={posterPath} alt={title} />
      </Link>
    </li>
  )
}

export default MovieItem
