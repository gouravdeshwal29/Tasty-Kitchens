import {Link} from 'react-router-dom'

import {FcRating} from 'react-icons/fc'

import {BiRupee} from 'react-icons/bi'

import './index.css'

const RestaurantItem = props => {
  const {restaurantItemDetails} = props
  const {
    id,
    imageUrl,
    name,
    cuisine,
    userRating,
    costForTwo,
  } = restaurantItemDetails
  const {rating, totalReviews} = userRating
  return (
    <Link to={`/restaurant/${id}`} className="restaurant-item-link">
      <li testid="restaurant-item" className="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-name-rating-reviews-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="restaurant-cost">
            <BiRupee size="18px" />
            <p className="restaurant-cost-for-two">{costForTwo}.00</p>
          </div>
          <div className="rating-and-reviews-container">
            <FcRating size="20px" />
            <p className="restaurant-rating">{rating}</p>
            <h1 className="restaurant-reviews">({totalReviews}) rating</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
