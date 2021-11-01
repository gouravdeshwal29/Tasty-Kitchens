import './index.css'

const OffersItem = props => {
  const {offerDetail} = props
  const {imageUrl} = offerDetail
  return (
    <li className="offer-container">
      <img src={imageUrl} alt="offer" className="offer" />
    </li>
  )
}

export default OffersItem
