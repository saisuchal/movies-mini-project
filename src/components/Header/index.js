import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'

const Header = props => {
  const [searchValue, setSearchValue] = useState('')
  const [displayMenu, menuDisplayStatus] = useState(false)
  const {location, position} = props
  const {pathname} = location
  const searchInput = event => {
    const {value} = event.target
    setSearchValue(value)
  }

  const showMenu = () => {
    if (displayMenu) {
      menuDisplayStatus(false)
    } else {
      menuDisplayStatus(true)
    }
  }

  return (
    <nav className="nav-header" style={{position: `${position}`}}>
      <div className="nav-content">
        <Link to="/">
          <img
            className="header-movies-logo"
            src="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742401427/Group_7399_1_zeb2ia.png"
            alt="website logo"
          />
        </Link>
        <div className="header-flex-row">
          <ul className="nav-list-1">
            <li>
              <Link to="/">
                <button
                  className="nav-button"
                  type="button"
                  style={{fontWeight: pathname === '/' && '700'}}
                >
                  Home
                </button>
              </Link>
            </li>

            <li>
              <Link to="/popular">
                <button
                  className="nav-button"
                  type="button"
                  style={{fontWeight: pathname === '/popular' && '700'}}
                >
                  Popular
                </button>
              </Link>
            </li>
          </ul>
          <ul className="nav-list-2">
            <li
              className="search-input-div"
              style={{border: pathname === '/search' && '1px white solid'}}
            >
              <input
                type="search"
                placeholder="search"
                className="search-input"
                style={{
                  display: pathname === '/search' ? 'display' : 'none',
                }}
                onChange={searchInput}
                value={searchValue}
                id="searchbox"
              />
              <Link
                to={
                  pathname !== '/search'
                    ? '/search'
                    : `/search?search=${searchValue}`
                }
              >
                <button
                  className="nav-button mobile-header-button"
                  data-testid="searchButton"
                  type="button"
                  style={{
                    backgroundColor: pathname === '/search' && 'grey',
                  }}
                >
                  <HiOutlineSearch className="search-icon" />
                </button>
              </Link>
            </li>
            <li className="hamburger">
              <button
                type="button"
                className="mobile-header-button"
                onClick={showMenu}
              >
                <img
                  src="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742935618/add-to-queue_1_1_aodxa3.png"
                  alt="menu"
                />
              </button>
            </li>
            <li className="avatar">
              <Link to="/account">
                <button className="nav-button" type="button">
                  <img
                    className="avatar-icon"
                    src="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742413864/Avatar_rcppji.png"
                    alt="profile"
                  />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mobile-nav-content">
        <ul
          className="mobile-nav-list-1"
          style={{display: displayMenu ? 'flex' : 'none'}}
        >
          <li>
            <Link to="/">
              <button
                className="nav-button"
                type="button"
                style={{fontWeight: pathname === '/' && '700'}}
              >
                Home
              </button>
            </Link>
          </li>

          <li>
            <Link to="/popular">
              <button
                className="nav-button"
                type="button"
                style={{fontWeight: pathname === '/popular' && '700'}}
              >
                Popular
              </button>
            </Link>
          </li>

          <li>
            <Link to="/account">
              <button
                className="nav-button"
                type="button"
                style={{fontWeight: pathname === '/account' && '700'}}
              >
                Account
              </button>
            </Link>
          </li>

          <li>
            <button className="nav-button" onClick={showMenu} type="button">
              <img
                src="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742935618/Solid_lomgu5.png"
                alt="close"
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
