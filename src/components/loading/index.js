import {h, Component} from 'preact';

export default class Loading extends Component {
  render() {
    return (
      <div className='loading'>
        <div className='animate-loading'>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
}
