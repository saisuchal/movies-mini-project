import './index.css'

import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found" aria-label="not found">
    <h1>Lost Your Way ?</h1>
    <p>
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <button className="go-to-home-button" type="button">
      <Link to="/">Go To Home</Link>
    </button>
  </div>
)

export default NotFound
