import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsFilterLeft} from 'react-icons/bs'

import {MdArrowDropDown} from 'react-icons/md'

import {GrLinkPrevious, GrLinkNext} from 'react-icons/gr'

import Header from '../Header'
import Footer from '../Footer'
import ReactSlider from '../ReactSlider'
import RestaurantItem from '../RestaurantItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    activePage: 1,
    restaurantList: [],
    sortDefault: sortByOptions[1].displayText,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantList()
  }

  getRestaurantList = async () => {
    const {activePage, sortDefault} = this.state
    const jwtToken = Cookies.get('jwt_token')

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const offset = (activePage - 1) * 9
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sortDefault}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          ratingText: each.user_rating.rating_text,
          totalReviews: each.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="home-loader-container" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  changeSortBy = event => {
    this.setState({sortDefault: event.target.value}, this.getRestaurantList)
  }

  onClickPrevious = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantList,
      )
    }
  }

  onClickNext = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurantList,
      )
    }
  }

  renderRestaurantItems = () => {
    const {restaurantList} = this.state
    return (
      <div className="restaurant-list-container">
        <ul className="list">
          {restaurantList.map(each => (
            <RestaurantItem key={each.id} restaurantItemDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantItems()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activePage, sortDefault} = this.state
    return (
      <div className="home-background-container">
        <Header />
        <ReactSlider />
        <div className="restaurant-details-container">
          <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
          <div className="sort-container">
            <p className="select-restaurants-line">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="sort-by-container">
              <BsFilterLeft />
              <p className="sort-by-line">Sort By</p>
              <select
                value={sortDefault}
                onChange={this.changeSortBy}
                className="drop-down"
              >
                {sortByOptions.map(each => (
                  <option key={each.id} value={each.value}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <MdArrowDropDown />
            </div>
          </div>
          <hr />
          {this.renderSwitch()}
          <div className="active-page-number-container">
            <button
              type="button"
              testid="pagination-left-button"
              onClick={this.onClickPrevious}
              className="previous-page-button"
            >
              <GrLinkPrevious />
            </button>
            <span testid="active-page-number" className="active-page-number">
              {activePage} of 4
            </span>
            <button
              type="button"
              testid="pagination-right-button"
              onClick={this.onClickNext}
              className="next-page-button"
            >
              <GrLinkNext />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
