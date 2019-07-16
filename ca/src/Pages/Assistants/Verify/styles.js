import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(104, 187, 102)'
    }
  }
})

const styles = () => ({
  root: {
    margin: '100px auto',
    marginBottom: 50,
    width: '90%'
  },
  loading: {
    position: 'relative',
    left: '45%'
  },
  subtitle: {
    fontSize: '1.2em'
  },
  progress: {
    margin: '0 10px'
  },
  btn: {
    fontSize: 15,
    minWidth: 150,
    textAlign: 'center'
  },
  input: {
    fontSize: 17
  },
  font: {
    fontSize: 15,
    fontWeight: 400,
    textAlign: 'center'
  },
  font2: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center'
  },
  font3: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    '&:not(:first-child)': {
      borderLeft: 'white solid 1px'
    }
  },
  font4: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center'
  },
  font5: {
    fontSize: 16,
    fontWeight: 400
    // textAlign: 'center'
  },
  font6: {
    fontSize: 15,
    fontWeight: 400,
    cursor: 'pointer',
    textAlign: 'center'
  },
  to: {
    display: 'inline-block',
    width: 100,
    height: 10,
    backgroundColor: '#eee'
  },
  action: {
    position: 'relative',
    right: 10
  },
  side: {
    position: 'fixed',
    top: 110,
    left: 5,
    width: 50
  },
  sideIconBottom:{
    position: 'fixed',
    bottom: 40,
    left: 5,
    width: 50,
  },
  sideIcon2: {
    position: 'absolute',
    top: 60,
    left: 'calc(100vw - 260px)'
  },
  Panels: {
    width: 'calc(100vw - 80px)',
    position: 'absolute',
    top: 110,
    left: 60,
    paddingBottom: 50
  },
  selected: {
    backgroundColor: '#b2e4a57d'
  },
  options: {
    background: '#f5f5f5',
    width: '100%',
    zIndex: 20,
    top: 0,
    marginLeft: 58,
    paddingTop: 60,
    left: 0,
    position: 'fixed'
    // borderBottom: '1px solid rgba(0, 0, 0, 0.34)'
  },
  state: {
    position: 'fixed',
    left: 6,
    bottom: 6,
    color: '#eee',
    zIndex: 1080
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    fontWeight: 'normal',
    marginRight: '1em'
  },
  header: {
    backgroundColor: 'rgba(143, 195, 131, 0.23)',
    padding: '2px  0'
  }
})

export { theme, styles }