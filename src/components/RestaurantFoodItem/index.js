import {Component} from 'react'

import {BiRupee} from 'react-icons/bi'

import {FcRating} from 'react-icons/fc'

import './index.css'

class RestaurantFoodItem extends Component {
  state = {
    addClicked: false,
    quantity: 1,
  }

  onClickingAdd = () => {
    const {quantity} = this.state
    const {addItemToCart, restaurantFoodItemDetail} = this.props
    const cartItem = {
      ...restaurantFoodItemDetail,
      quantity,
    }
    addItemToCart(cartItem)
    this.setState(prevState => ({
      addClicked: !prevState.addClicked,
    }))
  }

  subtractQuantity = () => {
    const {quantity} = this.state
    const {restaurantFoodItemDetail, decrementItem} = this.props
    const {id} = restaurantFoodItemDetail
    const cartItem = {
      ...restaurantFoodItemDetail,
      quantity,
    }
    decrementItem(id, cartItem)
  }

  removeItemFromCart = () => {
    const {restaurantFoodItemDetail, removeItem} = this.props
    const {id} = restaurantFoodItemDetail
    removeItem(id)
  }

  onSubtractingQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(
        prevState => ({quantity: prevState.quantity - 1}),
        this.subtractQuantity,
      )
    }
    if (quantity === 1) {
      this.setState({addClicked: false}, this.removeItemFromCart)
    }
  }

  addQuantity = () => {
    const {quantity} = this.state
    const {restaurantFoodItemDetail, incrementItem} = this.props
    const {id} = restaurantFoodItemDetail
    const cartItem = {
      ...restaurantFoodItemDetail,
      quantity,
    }
    incrementItem(id, cartItem)
  }

  onAddingQuantity = () => {
    this.setState(
      prevState => ({quantity: prevState.quantity + 1}),
      this.addQuantity,
    )
  }

  renderFoodItemWithAddButton = () => {
    const {restaurantFoodItemDetail} = this.props
    const {imageUrl, name, cost, rating} = restaurantFoodItemDetail
    return (
      <li testid="foodItem" className="restaurant-food-item">
        <div className="food-item-image-and-detail-container">
          <img
            src={imageUrl}
            alt="foodItem"
            className="restaurant-food-item-image"
          />
          <div className="food-item-detail-container">
            <h1 className="food-item-detail-container-name">{name}</h1>
            <div className="food-item-cost">
              <BiRupee size="18px" />
              <p className="food-item-detail-container-cost">{cost}.00</p>
            </div>
            <div className="food-item-rating">
              <FcRating size="18px" />
              <p className="food-item-detail-container-rating">{rating}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={this.onClickingAdd}
          className="food-item-add-button"
        >
          Add
        </button>
      </li>
    )
  }

  renderFoodItemWithQuantity = () => {
    const {quantity} = this.state
    const {restaurantFoodItemDetail} = this.props
    const {imageUrl, name, cost, rating} = restaurantFoodItemDetail
    return (
      <li testid="foodItem" className="restaurant-food-item">
        <div className="food-item-image-and-detail-container">
          <img
            src={imageUrl}
            alt="foodItem"
            className="restaurant-food-item-image"
          />
          <div className="food-item-detail-container">
            <h1 className="food-item-detail-container-name">{name}</h1>
            <div className="food-item-cost">
              <BiRupee size="18px" />
              <p className="food-item-detail-container-cost">{cost}.00</p>
            </div>
            <div className="food-item-rating">
              <FcRating size="18px" />
              <p className="food-item-detail-container-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="increment-decrement-container">
          <button
            type="button"
            onClick={this.onSubtractingQuantity}
            testid="decrement-count"
            className="food-item-add-button"
          >
            -
          </button>
          <p testid="active-count" className="active-page">
            {quantity}
          </p>
          <button
            type="button"
            onClick={this.onAddingQuantity}
            testid="increment-count"
            className="food-item-add-button"
          >
            +
          </button>
        </div>
      </li>
    )
  }

  render() {
    const {addClicked} = this.state
    return addClicked
      ? this.renderFoodItemWithQuantity()
      : this.renderFoodItemWithAddButton()
  }
}

export default RestaurantFoodItem
