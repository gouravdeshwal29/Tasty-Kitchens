import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiOutlineStar} from 'react-icons//ai'

import {BiRupee} from 'react-icons/bi'

import RestaurantFoodItem from '../RestaurantFoodItem'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class RestaurantItemDetails extends Component {
  state = {
    restaurantData: {},
    foodItemsData: [],
    cartList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  saveToLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  addItemToCart = cartItem => {
    const {cartList} = this.state
    const updateCart = [...cartList, cartItem]
    this.setState({cartList: updateCart}, this.saveToLocalStorage)
  }

  incrementItem = (id, cartItem) => {
    const {cartList} = this.state
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === id) {
        cartList.splice(i, 1)
      }
    }
    const updateCart = [...cartList, cartItem]
    this.setState({cartList: updateCart}, this.saveToLocalStorage)
  }

  decrementItem = (id, cartItem) => {
    const {cartList} = this.state
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === id) {
        cartList.splice(i, 1)
      }
    }
    const updateCart = [...cartList, cartItem]
    this.setState({cartList: updateCart}, this.saveToLocalStorage)
  }

  removeItem = id => {
    const {cartList} = this.state
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === id) {
        cartList.splice(i, 1)
      }
    }
    this.setState({cartList}, this.saveToLocalStorage)
  }

  getRestaurantData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        foodItems: fetchedData.food_items.map(each => ({
          cost: each.cost,
          foodType: each.food_type,
          id: each.id,
          imageUrl: each.image_url,
          name: each.name,
          rating: each.rating,
        })),
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        itemsCount: fetchedData.items_count,
        location: fetchedData.location,
        name: fetchedData.name,
        opensAt: fetchedData.opens_at,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
      }
      this.setState({
        restaurantData: updatedData,
        foodItemsData: updatedData.foodItems,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderFoodItems = () => {
    const {foodItemsData} = this.state
    return (
      <ul className="list">
        {foodItemsData.map(each => (
          <RestaurantFoodItem
            key={each.id}
            restaurantFoodItemDetail={each}
            addItemToCart={this.addItemToCart}
            incrementItem={this.incrementItem}
            decrementItem={this.decrementItem}
            removeItem={this.removeItem}
          />
        ))}
      </ul>
    )
  }

  renderRestaurantItemDetailsView = () => {
    const {restaurantData} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantData
    return (
      <>
        <div className="restaurants-item-details-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurants-item-details-container-image"
          />
          <div className="restaurants-item-details-container-details">
            <h1 className="restaurants-item-details-container-details-restaurant-name">
              {name}
            </h1>
            <p className="restaurants-item-details-container-details-restaurant-cuisine">
              {cuisine}
            </p>
            <p className="restaurants-item-details-container-details-restaurant-location">
              {location}
            </p>
            <div className="rating-and-cost-for-two-container">
              <div>
                <div className="rating-icon-counter">
                  <AiOutlineStar
                    size="16px"
                    color="white"
                    style={{margin: '2px'}}
                  />
                  <p className="restaurants-item-details-container-details-restaurant-rating">
                    {rating}
                  </p>
                </div>
                <p className="restaurants-item-details-container-details-restaurant-reviews-count">
                  {reviewsCount}+ ratings
                </p>
              </div>
              <div className="line-separation" />
              <div>
                <div className="cost-for-two-icon-counter">
                  <BiRupee size="16px" color="white" style={{margin: '2px'}} />
                  <p className="restaurants-item-details-container-details-restaurant-cost-for-two">
                    {costForTwo}
                  </p>
                </div>
                <p className="restaurants-item-details-container-details-restaurant-cost-for-two-line">
                  Cost for two
                </p>
              </div>
            </div>
          </div>
        </div>
        {this.renderFoodItems()}
        <Footer />
      </>
    )
  }

  renderLoadingView = () => (
    <div
      className="restaurants-item-details-loader-container"
      testid="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantItemDetailsView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurant-item-details-background-container">
        <Header />
        {this.renderSwitch()}
      </div>
    )
  }
}

export default RestaurantItemDetails
