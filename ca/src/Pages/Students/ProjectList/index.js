import React from 'react'
import { GridList } from 'material-ui/GridList'
import './style.css'
import { connect } from 'react-redux'
import { fetchProjects } from '../../../Redux/Students/Actions/ProjectList'
import ProjectTile from './ProjectTile'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: '50px',
    textAlign: 'center'
  },
  gridList: {
    width: 1000,
    opacity: 1,
    overflowY: 'auto'
  }
}

class index extends React.Component {
  constructor (props) {
    super(props)
    this.props.fetch_data()
  }

  render () {
    let id = 0
    return (
      <MuiThemeProvider className='container'>
        <div>
          <div className='divide-horizontal-list '>
            <div className='divide-horizontal-span-list' ref='top'>
              <p >專題列表</p>
            </div>
          </div>
          <div style={styles.root} className='hidden-xs hidden-sm'>
            <GridList style={styles.gridList} cols={2} cellHeight={270} padding={1}>
              {this.props.data.map((tile, index) => (
                <ProjectTile data={tile} key={index} />
              ))}
            </GridList>
          </div>
          <div style={styles.root} className='visible-xs visible-sm'>
            <GridList cols={1} cellHeight={270} padding={1}>
              {this.props.data.map((tile, index) => (
                <ProjectTile data={tile} key={index} rwd />
              ))}
            </GridList>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.Student.ProjectList.data,
  studentProfile: state.Student.User.studentIdcard
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(index)
