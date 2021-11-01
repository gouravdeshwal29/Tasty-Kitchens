import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BiRupee} from 'react-icons/bi'

import {RiCheckboxCircleFill} from 'react-icons/ri'

import Header from '../Header'
import CartItem from '../CartItem'

import './index.css'

class Cart extends Component {
  state = {
    cartList: [],
    placeOrder: false,
  }

  componentDidMount() {
    const storageData = localStorage.getItem('cartData')
    const localStorageData = JSON.parse(storageData)
    this.setState({cartList: localStorageData})
  }

  saveToLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  decrementItemFromCart = id => {
    const {cartList} = this.state
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === id && cartList[i].quantity === 1) {
        cartList.splice(i, 1)
      } else if (cartList[i].id === id && cartList[i].quantity > 1) {
        cartList.splice(i, 1, {
          ...cartList[i],
          quantity: cartList[i].quantity - 1,
        })
      }
    }
    this.setState({cartList}, this.saveToLocalStorage)
  }

  incrementItemFromCart = id => {
    const {cartList} = this.state
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === id) {
        cartList.splice(i, 1, {
          ...cartList[i],
          quantity: cartList[i].quantity + 1,
        })
      }
    }
    this.setState({cartList}, this.saveToLocalStorage)
  }

  renderCartView = () => {
    const {cartList} = this.state
    const cartView =
      cartList.length === 0 ? (
        <div className="cart-background-container">
          <div className="empty-cart-container">
            <img
              src="https://res.cloudinary.com/debsmavvr/image/upload/v1634714887/Zomato%20Clone/Layer_2_rb0k0g.png"
              alt="empty cart"
            />
            <h1 className="empty-cart-heading">No Order Yet!</h1>
            <p className="empty-cart-caption">
              Your cart is empty. Add something from the menu.
            </p>
            <Link to="/">
              <button type="button" className="empty-cart-button">
                Order now
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-background-container">
          <div className="item-quantity-price-container">
            <h1>Item</h1>
            <h1>Quantity</h1>
            <h1>Price</h1>
          </div>
          <ul className="cart-list">
            {cartList.map(each => (
              <CartItem
                key={each.id}
                cartItemDetail={each}
                decrementItemFromCart={this.decrementItemFromCart}
                incrementItemFromCart={this.incrementItemFromCart}
              />
            ))}
          </ul>
          {this.doCartTotal()}
        </div>
      )
    return cartView
  }

  doCartTotal = () => {
    const {cartList} = this.state
    let count = 0
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cartList.length; i++) {
      count += cartList[i].cost * cartList[i].quantity
    }

    const cleanCartList = () => {
      localStorage.setItem('cartData', JSON.stringify([]))
      this.setState({placeOrder: true})
    }

    return (
      <div className="cart-total-container">
        <h1 className="order-total-line">Order Total:</h1>
        <div>
          <div className="total">
            <BiRupee size="20px" />
            <p testid="total-price">{count}</p>
          </div>
          <button
            type="button"
            onClick={cleanCartList}
            className="place-order-button"
          >
            Place Order
          </button>
        </div>
      </div>
    )
  }

  orderPlacedView = () => (
    <div className="payment-success-container">
      <RiCheckboxCircleFill size="70px" />
      <h1 className="payment-success-heading">Payment Successful</h1>
      <p className="payment-success-caption">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="payment-success-button">
          Go To Home
        </button>
      </Link>
    </div>
  )

  render() {
    const {placeOrder} = this.state
    const cartView = placeOrder ? this.orderPlacedView() : this.renderCartView()
    return (
      <>
        <Header />
        {cartView}
      </>
    )
  }
}

export default Cart
