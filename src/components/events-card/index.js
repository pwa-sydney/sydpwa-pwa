import { h, Component } from 'preact';
import style from './style.scss'

export default class NextEvent extends Component {
  render() {
    return (
      <div className="events container">
        <div className="date">
          <div className="day">
            21
          </div>
          <div className="rest">
            <span className="mmm">
              June
            </span>
            <span>
              Wednesday
            </span>
          </div>
        </div>
        <div className="agenda">
          <ul>
            <li>
              <span className="time">
                6:00
              </span>
              <div className="topic">
                Doors Open
              </div>
            </li>

            <li>
              <span className="time">
                6:00
              </span>
              <div className="topic">
                Doors Open
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
