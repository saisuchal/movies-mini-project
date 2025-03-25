import {Component} from 'react'
import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import MoviesContext from '../../context/MoviesContext'

const Header = props => {
  const {location, position} = props
  const {pathname} = location
  return (
    <MoviesContext.Consumer>
      {value => {
        const {setSearchValue, searchValue} = value
        return (
          <nav className="header-nav" style={{position: `${position}`}}>
            <Link to="/">
              <button className="nav-button" type="button">
                <img
                  className="header-movies-logo"
                  src="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742401427/Group_7399_1_zeb2ia.png"
                  alt="website logo"
                />
              </button>
            </Link>
            <div className="header-flex-row">
              <ul className="nav-list-1">
                <Link to="/">
                  <li className="nav-link">
                    <button
                      className="nav-button"
                      type="button"
                      style={{fontWeight: pathname === '/' && '700'}}
                    >
                      Home
                    </button>
                  </li>
                </Link>
                <Link to="/popular">
                  <li className="nav-link">
                    <button
                      className="nav-button"
                      type="button"
                      style={{fontWeight: pathname === '/popular' && '700'}}
                    >
                      Popular
                    </button>
                  </li>
                </Link>
              </ul>
              <ul className="nav-list-2">
                <li className="search-input-div">
                  <input
                    type="search"
                    placeholder="search"
                    className="search-input"
                    style={{display: 'inline'}}
                    onChange={setSearchValue}
                  />
                  <button
                    className="nav-button"
                    data-testid="searchButton"
                    type="button"
                  >
                    <Link to={`/search?search=${searchValue}`}>
                      <HiOutlineSearch className="search-icon" />
                    </Link>
                  </button>
                </li>
                <Link to="/account">
                  <li className="avatar">
                    <button className="nav-button" type="button">
                      <img
                        className="avatar-icon"
                        src="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742413864/Avatar_rcppji.png"
                        alt="profile"
                      />
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          </nav>
        )
      }}
    </MoviesContext.Consumer>
  )
}

export default withRouter(Header)
