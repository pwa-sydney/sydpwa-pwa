import {h, Component} from 'preact';

import style from './style.scss'

export default class Socialise extends Component {
  render() {
    return (
      <div className={`${style.socialise} content`}>

        <a className={`${style.btn} slack`} href="https://now-examples-slackin-lmccajoxrq.now.sh/" rel="noopener" target="_blank">
          Join our Slack
        </a>

        <a className={`${style.btn} meetup`} href="https://www.meetup.com/Sydney-Progressive-Web-Apps-SydPWA/" rel="noopener" target="_blank">
          Join us on Meetup
        </a>

        <a className={`${style.btn} twitter`} href="https://twitter.com/SydPWA" rel="noopener" target="_blank">
          Follow us on Twitter
        </a>

      </div>
    );
  }
}
