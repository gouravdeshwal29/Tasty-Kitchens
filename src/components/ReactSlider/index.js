import {Component} from 'react'

import Slider from 'react-slick'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import OffersItem from '../OffersItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class ReactSlider extends Component {
  state = {
    offers: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOffersList()
  }

  getOffersList = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(offer => ({
        id: offer.id,
        imageUrl: offer.image_url,
      }))
      this.setState({
        offers: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="offers-loader-container" testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderOfferItems = () => {
    const {offers} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <ul className="offers-list">
        <Slider {...settings}>
          {offers.map(each => (
            <OffersItem key={each.id} offerDetail={each} />
          ))}
        </Slider>
      </ul>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOfferItems()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderSwitch()
  }
}

export default ReactSlider
