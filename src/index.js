// import 'promise-polyfill';
// import 'isomorphic-fetch';
import {h, render} from 'preact';

import style from './style/index.scss';

import OfflinePlugin from 'offline-plugin/runtime';

let root = document.getElementById('app');
function init() {
  let App = require('./components/app').default;
  root = render(<App />, document.body, root);
}

OfflinePlugin.install({
  onInstalled: function() {
    // console.log('offline Ready');
  },

  onUpdating: function() {

  },
  onUpdateReady: function() {
    OfflinePlugin.applyUpdate();
  },
  onUpdated: function() {
    window.location.reload();
  }
});

// in development, set up HMR:
if (module.hot) {
  // require('preact/devtools');   // turn this on if you want to enable React DevTools!
  module.hot.accept('./components/app', () => requestAnimationFrame(init));
}

init();
