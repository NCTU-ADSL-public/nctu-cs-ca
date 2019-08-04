import React from 'react'
import { connect } from 'react-redux'
import { GridList } from 'material-ui/GridList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ProjectTile from './Tile'
import { fetchProjects } from '../../../Redux/Students/Actions/Project'
import AddIcons from './AddProject'
import './style.css'

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

class Index extends React.Component {
  componentDidMount () {
    this.props.fetchData()
  }

  render () {
    return (
      <MuiThemeProvider className='container'>
        <div>
          <div className='divide-horizontal-list'>
            <div className='divide-horizontal-span-list' ref='top'>
              <p >專題列表</p>
            </div>
          </div>
          <div style={styles.root} className='hidden-xs hidden-sm'>
            <GridList style={styles.gridList} cols={2} cellHeight={270} padding={1}>
              {
                this.props.data.map((tile, index) => (
                  <ProjectTile data={tile} key={index} />
                ))
              }
              <AddIcons />
            </GridList>
          </div>
          <div style={styles.root} className='visible-xs visible-sm'>
            <GridList cols={1} cellHeight={270} padding={1}>
              {
                this.props.data.map((tile, index) => (
                  <ProjectTile data={tile} key={index} rwd />
                ))
              }
              <AddIcons rwd />
            </GridList>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.Student.Project.data
})
const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchProjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
