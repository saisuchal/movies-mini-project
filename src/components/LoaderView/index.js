import './index.css'
import Loader from 'react-loader-spinner'

const LoaderView = props => {
  const {height} = props
  return (
    <div
      className="loader-container"
      data-testid="loader"
      style={{height: `${height}`}}
    >
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )
}
export default LoaderView
