import './index.css'

import {BiRupee} from 'react-icons/bi'

const CartItem = props => {
  const {cartItemDetail, decrementItemFromCart, incrementItemFromCart} = props
  const {id, imageUrl, cost, name, quantity} = cartItemDetail

  const onDecrementingItemInCart = () => {
    decrementItemFromCart(id)
  }

  const onIncrementingItemInCart = () => {
    incrementItemFromCart(id)
  }

  return (
    <li testid="cartItem" className="cart-item">
      <div className="image-name">
        <img src={imageUrl} alt="cart Item" className="cart-item-image" />
        <h1 className="cart-item-name">{name}</h1>
      </div>
      <div className="increment-decrement-buttons">
        <button
          type="button"
          testid="decrement-quantity"
          onClick={onDecrementingItemInCart}
          className="button"
        >
          -
        </button>
        <p testid="item-quantity">{quantity}</p>
        <button
          type="button"
          testid="increment-quantity"
          onClick={onIncrementingItemInCart}
          className="button"
        >
          +
        </button>
      </div>
      <div className="price">
        <BiRupee size="20px" />
        <p>{cost}</p>
      </div>
    </li>
  )
}

export default CartItem
