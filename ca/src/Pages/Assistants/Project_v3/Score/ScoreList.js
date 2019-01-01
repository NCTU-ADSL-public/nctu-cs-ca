import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({

})
// const PROJECT_STATUS = ['已申請專題', '專題審核中', '未申請專題']
// const PROJECT_STATUS_COLOR = ['green', 'orange', 'red']

class ScoreList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      panel_open: [...Array(10)].map(val => true)
    }
  }

  render () {
    const { scores } = this.props
    const { panel_open } = this.state

    return (
      scores.map((score, index) => {
        return (
          <div style={{ margin: '5px auto', fontFamily: 'Noto Sans CJK TC' }}>
            <ExpansionPanel expanded={panel_open[index]} onChange={() => this.setState({ panel_open: panel_open.map((val, i) => i === index ? !val : val) })} >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style={{ width: '100%', display: 'flex' }}>
                  <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ score.student.id }</div>
                  <div style={{ fontSize: 20, flex: 0.3, textAlign: 'center', color: 'black' }} >{ score.student.name }</div>
                  <div style={{ fontSize: 20, flex: 0.3, textAlign: 'center', color: 'black' }} >{ score.professor_name }</div>
                  <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ score.student.score ? score.student.score : '尚未評分' }</div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {
                  score.student.comment
                    ? <div style={{ width: '100%', display: 'flex' }} >
                      <div style={{ fontSize: 17, flex: 1, textAlign: 'center' }} variant='display1' >{score.student.comment}</div>
                    </div>
                    : <div style={{ width: '100%', display: 'flex' }} >
                      <div style={{ fontSize: 17, flex: 1, textAlign: 'center' }} variant='display1' >無評論</div>
                    </div>
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )
      })
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScoreList))
