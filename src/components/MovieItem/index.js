import './index.css'
import {Link} from 'react-router-dom'

const MovieItem = props => {
  const {movie} = props
  const {posterPath, id, title} = movie
  return (
    <li className="poster-div">
      <Link to={`/movies/${id}`}>
        <img className="poster" src={posterPath} alt={title} />
      </Link>
    </li>
  )
}

export default MovieItem
