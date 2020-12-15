import React from 'react';
import { RouteComponentProps, withRouter, WithRouterProps } from 'react-router';

interface MatchParams {
  id: string;
}

interface OwnState {
  id: string | null;
}

class VideoComponent extends React.Component<
  RouteComponentProps<MatchParams>,
  OwnState
> {
  _videoPlayerRef;

  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
    this._videoPlayerRef = React.createRef();
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.setState({
      id: params.id
    });
  }

  componentWillReceiveProps = (nextProps: RouteComponentProps<MatchParams>) => {
    const {
      match: { params }
    } = nextProps;
    const id = params.id;
    if (this.state.id !== id)
      this.setState(
        {
          id
        },
        () => {
          if (this._videoPlayerRef.current) {
            this._videoPlayerRef.current.currentTime = 0;
            this._videoPlayerRef.current.load();
          }
        }
      );
  };

  shouldComponentUpdate = nextProps => {
    const {
      match: { params }
    } = nextProps;
    const id = params.id;
    return this.state.id !== id;
  };

  render = () => {
    const { id } = this.state;
    const host = window.location.host;
    return (
      <React.Fragment>
        {id && (
          <video
            ref={this._videoPlayerRef}
            style={{ margin: '20px auto', outline: 'none' }}
            width='100%'
            height='auto'
            controls
            autoPlay
          >
            <source
              src={`http://${host}/api/stream?id=${id}`}
              type='video/mp4'
            />
          </video>
        )}
      </React.Fragment>
    );
  };
}

export default withRouter(VideoComponent);
