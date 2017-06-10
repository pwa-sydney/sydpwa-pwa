import { h, Component } from 'preact';
import { Router } from 'preact-router';

import AsyncRoute from './async-route';

import IntroCard from './intro-card'
import Footer from './footer'

export default class App extends Component {
  state = {
    mobileNav: false,
    page: null,
    post: null,
    url: null
  };

  handleRoute = ({ url }) => {
    let prev = this.state.url || '/';
    if (url !== prev && typeof ga === 'function') {
      this.setState({ url });
      ga('send', 'pageview', url);
    }
  };

  render() {
    return (
      <div id="app">
        <IntroCard />
        <Router onChange={this.handleRoute}>
          <AsyncRoute
            path='/'
            component={props => <AsyncRoute props={props} />}
          />
          <AsyncRoute
            path='/events'
            component={props => <AsyncRoute props={props} />}
          />
          <AsyncRoute
            path='/speakers'
            component={props => <AsyncRoute props={props} />}
          />
          <AsyncRoute
            path='/socialise'
            component={props => <AsyncRoute props={props} />}
          />
          {/*<NotFound default />*/}
        </Router>
        <Footer />
      </div>
    );
  }
}
