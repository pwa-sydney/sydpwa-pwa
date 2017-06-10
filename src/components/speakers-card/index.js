import {h, Component} from 'preact';
import { Link } from 'preact-router/match';

import style from './style.scss';

import speakerList from './speakers.json';

const Speaker = ({avatar, name, position, twitter}) => (
  <li>
    <div className="avatar">
      <img src={avatar} alt={name} />
    </div>
    <div className="info">
      <a className='name' href={twitter} rel="noopener"> {name} </a>
      <span> {position} </span>
    </div>
  </li>
)

export default class Speakers extends Component {
  render() {
    return (
      <div className={`${style.speakers} content`}>
        <ul>
          {
            speakerList.map(speaker => (
              <Speaker {...speaker} />
            ))
          }
        </ul>
      </div>
    );
  }
}
