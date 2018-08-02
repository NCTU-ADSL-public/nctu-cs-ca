import React from 'react'
import {GridList} from 'material-ui/GridList'
import axios from 'axios'
import './style.css'
import { connect } from 'react-redux'
import { fetchProjects } from '../../../Redux/Students/Actions/ProjectList'
import ProjectTile from './ProjectTile'

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

  onClick (project, t) {
    if (t === '1') {
      this.setState({project: this.state.newprojectList.filter(t => t.research_title === project.real_title)[0], index: 1})
    } else {
      this.deletedata('/students/formDelete', project)
    }
  }

  render () {
    let id = 0
    return (
      <div className='container'>
        <div>
          <div className='divide-horizontal-list '>
            <div className='divide-horizontal-span-list' ref='top'>
              <p >專題列表</p>
            </div>
          </div>
          <div style={styles.root} className='hidden-xs hidden-sm'>
            <GridList style={styles.gridList} cols={2} cellHeight={'270px'} padding={1}>
              {this.props.data.map((tile) => (
                <ProjectTile data={tile} key={id++} />
          ))}
            </GridList>
          </div>
          <div style={styles.root} className='visible-xs visible-sm'>
            <GridList cols={1} cellHeight={'270px'} padding={1}>
              {this.props.data.map((tile) => (
                <ProjectTile data={tile} key={id++} rwd />
          ))}
            </GridList>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.Student.ProjectList.data
})
const mapDispatchToProps = (dispatch) => ({
  fetch_data: () => dispatch(fetchProjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(index)
