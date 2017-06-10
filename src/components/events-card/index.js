import { h, Component } from 'preact';
import style from './style.scss'

import events from './events.json';

const List = ({time, title, speaker}) => (
  <li>
      <span className="time">
        {time}
    </span>
    <div className="topic">
      <span className="label">{title}</span>
      <span className="speaker">{speaker}</span>
    </div>
  </li>
)

export default class NextEvent extends Component {
  render() {
    return (
      <div className={`${style.events} content`}>
        <div className={style.date}>
          <div className={style.day}>
            {events.dd}
          </div>
          <div className={style.rest}>
            <span className={style.mmm}>
              {events.month}
            </span>
            <span>
              {events.day}
            </span>
          </div>
        </div>
        <div className={style.agenda}>
          <ul>
            {
              events.agenda.map(item => (
                <List {...item} />
              ))
            }

          </ul>
        </div>
      </div>
    )
  }
}
