import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'

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
  ok_net_media: {
    fontSize: '13px',
    marginLeft: '15px',
    fontWeight: 'bold',
    color: 'green',
    verticalAlign: 'middle'
  },
  error_net_media: {
    fontSize: '15px',
    color: 'red',
    marginLeft: '15px',
    fontWeight: 'bold'
  },
})

class WebNet extends React.Component {
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
        <div className='col-md-5 col-lg-5 col-xs-5'>
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
        <div className='col-md-6 col-lg-6 col-xs-6' style={{ display: 'flex' }}>
          <div style={{ fontSize: '23px', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>網多專選</div>
          <div style={{ display: 'block', marginLeft: '20px', marginTop: '5px' }}>
            <div>{'網　路'}<span>{ student.net.length <= 0 ? <Clear className={classes.error_net_media} /> : <span className={classes.ok_net_media} >{
              student.net.reduce((res, str) => res += str + ', ', '')
            }</span> }</span></div>
            <div>多媒體<span>{ student.media.length <= 0 ? <Clear className={classes.error_net_media} /> : <span className={classes.ok_net_media} >{
              student.media.reduce((res, str) => res += str + ', ', '')
            }</span> }</span></div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WebNet))