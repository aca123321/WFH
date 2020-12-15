import * as React from 'react';
import { VideoItemProps } from '../shared/Video';
import VideoItem from './components/VideoItem/VideoItem';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VideoComponent from './components/VideoComponent/VideoComponent';
import cx from 'classNames';
import MainStyles from './styles/MainStyles';

interface OwnState {
  videoList: VideoItemProps[];
}

function Home(props): JSX.Element {
  return props.videos.map((file, index) => <VideoItem key={index} {...file} />);
}

class App extends React.Component<{}, OwnState> {
  constructor(props) {
    super(props);
    this.state = {
      videoList: []
    };
  }

  componentDidMount = () => {
    fetch('/api/getMediaFiles').then(response => {
      response.json().then(data => {
        this.setState({
          videoList: data.mediaFiles
        });
      });
    });
  };

  render = (): JSX.Element => {
    return (
      <Router basename='/'>
        <div style={MainStyles.mainContainer}>
          <NavBar />
          <div style={MainStyles.pageContent}>
            <div style={MainStyles.contentList}>
              <Home videos={this.state.videoList} />
            </div>
            <div style={MainStyles.videoContainer}>
              <Switch>
                <Route path='/vid/:id' component={VideoComponent} exact />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  };
}

export default App;
