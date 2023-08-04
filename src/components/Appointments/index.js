// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilteredActive: false,
  }

  onClickStar = () => {
    const {isFilteredActive} = this.state
    this.setState({isFilteredActive: !isFilteredActive})
  }

  toggleStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStar: !eachItem.isStar}
        }
        return eachItem
      }),
    }))
  }

  onSubmitAppointments = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formatedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formatedDate,
      isStar: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointments = () => {
    const {appointmentList, isFilteredActive} = this.state

    if (isFilteredActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStar === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput} = this.state

    const filteredAppointmentLists = this.getFilteredAppointments()

    return (
      <div className="appointment-container">
        <div className="appointment-card-container">
          <div className="form-image-container">
            <div className="form-container">
              <h1 className="appointments-heading">Add Appointment</h1>
              <form onSubmit={this.onSubmitAppointments}>
                <div className="input-container">
                  <label htmlFor="text" className="label">
                    TITLE
                  </label>
                  <br />
                  <input
                    type="text"
                    id="text"
                    placeholder="Title"
                    className="input-element"
                    onChange={this.onChangeInput}
                    value={titleInput}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="date" className="label">
                    DATE
                  </label>
                  <br />
                  <input
                    type="date"
                    id="date"
                    className="input-element"
                    onChange={this.onChangeDateInput}
                    value={dateInput}
                  />
                </div>
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="starred-button-container">
            <h1 className="appointment-subheading">Appointments</h1>
            <button
              type="button"
              className="stared-button"
              onClick={this.onClickStar}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredAppointmentLists.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleStarred={this.toggleStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
