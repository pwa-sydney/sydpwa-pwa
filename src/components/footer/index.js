import {h, Component} from 'preact';

import style from './style.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className={style.footer}>
        © SydPWA 2017 - Made in<span>🇦🇺</span>by 
        <a href="https://twitter.com/_zouhir" rel="noopener" target="_blank">Zouhir</a> and
        <a href="https://twitter.com/chrisalwinjames" rel="noopener" target="_blank">Chris</a>
      </footer>
    );
  }
}
