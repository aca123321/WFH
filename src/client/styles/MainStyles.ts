import Colors from './Colors';

const MainStyles = {
  mainContainer: {
    backgroundColor: Colors.backgroundDark,
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    color: Colors.white,
    overflow: 'hidden'
  },
  navBar: {
    height: '40',
    paddingLeft: 40,
    borderBottom: `1px solid ${Colors.white}`
  },
  contentList: {
    backgroundColor: Colors.darkBlue,
    height: '100%',
    overflowX: 'hidden',
    width: '30vw'
  },
  pageContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  videoContainer: {
    padding: '20px',
    textAlign: 'center',
    flex: 1,
    height: '100%'
  }
};

export default MainStyles;
