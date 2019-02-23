import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import { setScores } from '../../../../Redux/Assistants/Actions/Project_v3/Score'

const styles = theme => ({
  button: {
    fontSize: '16px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100
  },
  textField2: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  label: {
    fontSize: '20px'
  },
  dialog: {
    padding: '10px'
  }
})
// const PROJECT_STATUS = ['已申請專題', '專題審核中', '未申請專題']
// const PROJECT_STATUS_COLOR = ['green', 'orange', 'red']

class ScoreList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open_edit: -1,
      new_score: 0,
      new_comment: "無評論"
    }
  }

  render () {
    const { scores, classes, semester, first_second, set_scores } = this.props
    const { open_edit, new_score, new_comment } = this.state

    return (
      scores.map((score, index) => {
        return (
          <div style={{ margin: '5px auto', fontFamily: 'Noto Sans CJK TC' }}>
            <ExpansionPanel expanded={true} >
              <ExpansionPanelSummary>
                <div style={{ width: '100%', display: 'flex' }}>
                  <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ score.student.id }</div>
                  <div style={{ fontSize: 20, flex: 0.3, textAlign: 'center', color: 'black' }} >{ score.student.name }</div>
                  <div style={{ fontSize: 20, flex: 0.3, textAlign: 'center', color: 'black' }} >{ score.professor_name }</div>
                  <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ score.student.score ? score.student.score : '尚未評分' }</div>
                  <div>
                    <Button variant="outlined" className={classes.button} onClick = { () => this.setState({
                      open_edit: index,
                      new_score: score.student.score ? score.student.score : 0,
                      new_comment: score.student.comment ? score.student.comment : '無評論'
                    }) } >
                      助理端評分
                    </Button>
                  </div>
                  <Dialog onClose = { () => this.setState({ open_edit: false })} open = { open_edit === index } >
                    <DialogTitle><div style = {{ fontSize: '25px' }} >助理端評分</div></DialogTitle>
                    <h4 style = {{ paddingLeft: '30px' }}>{score.student.id + " " + score.student.name}</h4>
                    <div style = {{ display: 'flex', paddingLeft: '20px', paddingRight: '20px' }}>
                      <TextField
                        label='分數'
                        type='number'
                        value={ new_score }
                        onChange={ (event) => this.setState({ new_score: event.target.value })}
                        margin='normal'
                        className={classes.textField}
                        InputLabelProps={{
                          classes: {
                            root: classes.label
                          },
                          shrink: true
                        }}
                      />
                      <TextField
                        label='評論'
                        margin='normal'
                        value={ new_comment }
                        className={classes.textField2}
                        onChange={ (event) => this.setState({ new_comment: event.target.value })}
                        InputLabelProps={{
                          classes: {
                            root: classes.label
                          },
                          shrink: true
                        }}
                      />
                    </div>
                    <br />
                    <div style = {{ display: 'flex' }}>
                      <div style = {{ flex: 1 }} />
                      <Button className={classes.button} onClick={ () => this.setState({ open_edit: -1 }) } >取消</Button>
                      <Button color="primary" className={classes.button} onClick = { () => {
                        set_scores({
                          student_id: score.student.id,
                          tname: score.student.name,
                          research_title: score.student.research_title,
                          first_second: first_second,
                          semester: semester,
                          new_score: new_score,
                          new_comment: new_comment
                        })
                        this.setState({ open_edit: -1 })
                      }}>
                        送出！
                      </Button>
                    </div>
                  </Dialog>
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
  set_scores: (payload) => dispatch(setScores(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScoreList))
