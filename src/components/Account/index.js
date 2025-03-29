import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'

const Account = props => {
  const cookies = Cookies.get()
  const {username, pwdLength} = cookies
  const logout = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('username')
    Cookies.remove('pwdLength')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="profile-page">
      <Header position="none" />
      <div className="profile-div">
        <h1 className="account-heading">Account</h1>
        <hr />
        <div className="account-flex-row">
          <p className="para-margin">Member ship</p>
          <div>
            <p>{username}@gmail.com</p>
            <p>Password : {'*'.repeat(pwdLength)}</p>
          </div>
        </div>
        <hr />
        <div className="account-flex-row">
          <p className="para-margin">Plan Details</p>
          <p>Premium </p>
          <p
            style={{
              border: '1px solid white',
              padding: '2px',
              marginLeft: '1vw',
            }}
          >
            Ultra HD
          </p>
        </div>
        <hr />
        <button type="button" className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(Account)
