import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Done from '@material-ui/icons/Done'

const styles = theme => ({
  ok: {
    fontSize: '20px',
    marginLeft: '15px',
    fontWeight: 'bold',
    color: 'green',
    verticalAlign: 'middle'
  },
  tabRoot: {
    background: '#34855e',
    color: 'white',
    margin: '0 1px'
  },
  tabRootCurrent: {
    background: 'purple',
    color: 'white',
    margin: '0 1px'
  },
  tabLabel: {
    fontSize: 15
  },
})

class OtherProgram extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { classes, student } = this.props

    return (
      <div className='row' style={{ display: 'flex', marginLeft: '20px' }}>
        <div style={{ fontSize: '23px', float: 'left', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>必修</div>
        <div className='col-md-11 col-lg-11 col-xs-11'>
        {
          student.compulse.length + student.current.length === 0
            ? <Done className={classes.ok} style={{ fontSize: '30px', marginTop: '12px' }} />
            : <Tabs
              scrollable
              scrollButtons='auto'
              style={{ width: '100%' }}
            >
              {
                student.current.map((title, index) => (
                  <Tab key = {index} label={title} classes={{
                    root: classes.tabRootCurrent,
                    label: classes.tabLabel,
                    selected: classes.tabSelected
                  }} />
                ))
              }
              {
                student.compulse.map((title, index) => (
                  <Tab key = {index} label={title} classes={{
                    root: classes.tabRoot,
                    label: classes.tabLabel,
                    selected: classes.tabSelected
                  }} />
                ))
              }
            </Tabs>
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  Status: state.Assistant.Graduation.Status,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OtherProgram))