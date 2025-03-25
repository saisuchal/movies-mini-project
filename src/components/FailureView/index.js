import './index.css'

const FailureView = props => {
  const {imgUrl, retry, height, imageHeight} = props
  const tryAgain = () => {
    retry()
  }
  return (
    <div className="failure-div" style={{height: `${height}`}}>
      <img src={imgUrl} alt="failure view" style={{height: `${imageHeight}`}} />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
