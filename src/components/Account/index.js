import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'

const Account = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="profile-page">
      <Header position="none" />
      <div className="profile-div">
        <h1 style={{textAlign: 'start'}}>Account</h1>
        <hr />
        <div className="flex-row">
          <p className="para-margin">Member ship</p>
          <div>
            <p>rahul@gmail.com</p>
            <p>Password</p>
          </div>
        </div>
        <hr />
        <div className="flex-row">
          <p className="para-margin">Plan Details</p>
          <p>Premium </p>
          <p style={{border: '1px solid black', padding: '2px'}}>Ultra HD</p>
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
