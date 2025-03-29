import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

const MovieSlider = props => {
  const {heading, data, apiStatus, retry} = props

  const renderSliderView = () => (
    <div className="slick-container">
      <Slider {...settings}>
        {data.map(eachMovie => {
          const {id, posterPath, title} = eachMovie
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies/${id}`} className="slider-item-link">
                <img className="slider-image" src={posterPath} alt={title} />
              </Link>
            </div>
          )
        })}
      </Slider>
    </div>
  )

  const SliderView = () => {
    switch (true) {
      case apiStatus === apiStatusConstants.success:
        return renderSliderView()
      case apiStatus === apiStatusConstants.failure:
        return (
          <FailureView
            height="25vh"
            retry={retry}
            imageHeight="5vh"
            imgUrl="https://res.cloudinary.com/dahbfvpdn/image/upload/v1742640688/alert-triangle_ue3kkq.png"
          />
        )
      case apiStatus === apiStatusConstants.inProgress:
        return <LoaderView height="25vh" />
      default:
        return null
    }
  }

  return (
    <div className="main-container">
      <h1 className="slide-title">{heading}</h1>
      <SliderView />
    </div>
  )
}

export default MovieSlider
