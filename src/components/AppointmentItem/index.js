// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarred} = props
  const {id, title, date, isStar} = appointmentDetails

  const onClickStarImage = () => {
    toggleStarred(id)
  }

  const imgUrl = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-list">
      <div className="title-container">
        <p className="title">{title}</p>
        <button type="button" data-testid="star" onClick={onClickStarImage}>
          <img src={imgUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
