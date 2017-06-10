import { h, Component } from 'preact';
import htmlFetch from '../lib/fetch.js';

import Loading from './loading'

export default class AsyncRoute extends Component {
  state = {
    loaded: false
  };
  loadLayout = path => {
    console.log(path)
    if ( path === '/' || path === '/events')
      return System.import('./events-card');
    if(path === '/speakers')
      return System.import('./speakers-card');
    if(path === '/socialise')
      return System.import('./socialise-card');
  };

  makeRoute = props => {
    this.loadLayout(props.path).then(component => {
      this.component = component.default;
      this.setState({ loaded: true });
    })
  };

  componentDidMount() {
    this.makeRoute(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.path !== nextProps.path) {
      this.setState({ loaded: false });
      this.content = null;
      this.makeRoute(nextProps);
    }
  }
  render() {
    if (this.state.loaded) {
      return <this.component {...this.props} />;
    }
    else {
      return <Loading />;
    }
  }
}
