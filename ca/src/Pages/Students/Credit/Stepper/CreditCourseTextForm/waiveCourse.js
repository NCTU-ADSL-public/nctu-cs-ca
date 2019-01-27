import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto'
  },
  label: {
    fontSize: '20px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  menu: {
    width: 150,
    fontSize: '20px'
  }
})

const mapStateToProps = (state) => ({
  // students: state.Assistant.Graduation.students,
})

const mapDispatchToProps = (dispatch) => ({
  // fetch_students: (grade) => dispatch(fetchStudent(grade)),
})

class WaiveForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      ori_school: '',
      depart: '',
      apply: {
        id: 0,
        subject: '',
        grade: 0,
        first_second: 0,
        depart: '',
        score: 0,
        credit: 0
      },
      apply_list: []
    }
  }

  render () {
    const { classes } = this.props
    const { phone, ori_school, depart, apply, apply_list } = this.state

    return (
      <div className={classes.container}>
        <h2 style={{ margin: '40px' }}>基本資料</h2>
        <hr />
        <div style={{ margin: '40px' }}>
          <TextField
            label='申請人'
            defaultValue='測試帳號'
            margin='normal'
            className={classes.textField}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              }
            }}
          />
          <TextField
            label='班別'
            defaultValue='資工B'
            margin='normal'
            className={classes.textField}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              }
            }}
          />
          <TextField
            label='學號'
            defaultValue='0416000'
            margin='normal'
            className={classes.textField}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              }
            }}
          />
          <TextField
            label='手機'
            defaultValue=''
            margin='normal'
            className={classes.textField}
            InputProps={{
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            value={phone}
            onChange={
              (event) => {
                this.setState({ phone: event.target.value })
              }
            }
          />
          <TextField
            label='原就讀學校'
            defaultValue=''
            margin='normal'
            className={classes.textField}
            InputProps={{
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            value={ori_school}
            onChange={
              (event) => {
                this.setState({ ori_school: event.target.value })
              }
            }
          />
          <TextField
            label='系所科別'
            defaultValue=''
            margin='normal'
            className={classes.textField}
            InputProps={{
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            value={depart}
            onChange={
              (event) => {
                this.setState({ depart: event.target.value })
              }
            }
          />
        </div>
        <h2 style={{ margin: '40px' }}>{'抵免申請' + '(' + apply_list.length + '門課, 共' + apply_list.reduce((total, apply_obj) => parseInt(total) + parseInt(apply_obj.credit), 0) + '學分)'}</h2>
        <hr />
        <div>
          <AddIcon
            style={{ marginLeft: '40px', color: 'grey', fontSize: '30px' }}
            onClick={
              () => {
                this.setState({
                  apply_list: [ ...apply_list, apply ],
                  apply: { ...apply,
                    id: apply.id + 1,
                    subject: '',
                    grade: 0,
                    first_second: 0,
                    depart: '',
                    score: 0,
                    credit: 0
                  }
                })
              }
            }
          />
          <TextField
            label='科目'
            defaultValue=''
            margin='normal'
            className={classes.textField}
            InputProps={{
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            value={apply.subject}
            onChange={
              (event) => {
                this.setState({ apply: { ...apply,
                  subject: event.target.value
                } })
              }
            }
          />
          <TextField
            label='開課系所'
            defaultValue=''
            margin='normal'
            className={classes.textField}
            InputProps={{
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            value={apply.depart}
            onChange={
              (event) => {
                this.setState({ apply: { ...apply,
                  depart: event.target.value
                } })
              }
            }
          />
          <TextField
            select
            label='修課年級'
            className={classes.textField}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            margin='normal'
            value={apply.grade}
            onChange={
              (event) => {
                this.setState({ apply: { ...apply,
                  grade: event.target.value
                } })
              }
            }
          >
            <option key={0} value={0}>請選擇修課年級</option>
            <option key={1} value={1}>一</option>
            <option key={2} value={2}>二</option>
            <option key={3} value={3}>三</option>
            <option key={4} value={4}>四</option>
          </TextField>
          <TextField
            select
            label='學期'
            className={classes.textField}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            margin='normal'
            value={apply.first_second}
            onChange={
              (event) => {
                this.setState({ apply: { ...apply,
                  first_second: event.target.value
                } })
              }
            }
          >
            <option key={0} value={0}>請選擇學期</option>
            <option key={1} value={1}>上</option>
            <option key={2} value={2}>下</option>
          </TextField>
          <TextField
            label='學分'
            defaultValue=''
            margin='normal'
            type='number'
            className={classes.textField}
            InputProps={{
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            value={apply.credit}
            onChange={
              (event) => {
                this.setState({ apply: { ...apply,
                  credit: event.target.value
                } })
              }
            }
          />
          <TextField
            label='成績'
            defaultValue=''
            margin='normal'
            type='number'
            className={classes.textField}
            InputProps={{
            }}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            value={apply.score}
            onChange={
              (event) => {
                this.setState({ apply: { ...apply,
                  score: event.target.value
                } })
              }
            }
          />
        </div>
        {
          apply_list.map((apply_obj) => (
            <div>
              <Paper style={{ padding: '20px', margin: '10px 20px' }}>
                <DeleteIcon
                  style={{ color: 'grey', fontSize: '30px' }}
                  onClick={
                    () => {
                      this.setState({
                        apply_list: apply_list.filter((apply_iter) => apply_iter.id !== apply_obj.id)
                      })
                    }
                  }
                />
                <TextField
                  label='科目'
                  defaultValue=''
                  margin='normal'
                  className={classes.textField}
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.label
                    },
                    shrink: true
                  }}
                  value={apply_obj.subject}
                />
                <TextField
                  label='開課系所'
                  defaultValue=''
                  margin='normal'
                  className={classes.textField}
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.label
                    },
                    shrink: true
                  }}
                  value={apply_obj.depart}
                />
                <TextField
                  select
                  label='修課年級'
                  className={classes.textField}
                  InputProps={{
                    readOnly: true
                  }}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.label
                    },
                    shrink: true
                  }}
                  margin='normal'
                  value={apply_obj.grade}
                >
                  <option key={0} value={0}>請選擇修課年級</option>
                  <option key={1} value={1}>一</option>
                  <option key={2} value={2}>二</option>
                  <option key={3} value={3}>三</option>
                  <option key={4} value={4}>四</option>
                </TextField>
                <TextField
                  select
                  label='學期'
                  className={classes.textField}
                  InputProps={{
                    readOnly: true
                  }}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.label
                    },
                    shrink: true
                  }}
                  margin='normal'
                  value={apply_obj.first_second}
                >
                  <option key={0} value={0}>請選擇學期</option>
                  <option key={1} value={1}>上</option>
                  <option key={2} value={2}>下</option>
                </TextField>
                <TextField
                  label='學分'
                  defaultValue=''
                  margin='normal'
                  type='number'
                  className={classes.textField}
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.label
                    },
                    shrink: true
                  }}
                  value={apply_obj.credit}
                />
                <TextField
                  label='成績'
                  defaultValue=''
                  margin='normal'
                  type='number'
                  className={classes.textField}
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.label
                    },
                    shrink: true
                  }}
                  value={apply_obj.score}
                />
              </Paper>
            </div>
          ))
        }
        <div style={{ height: '100px' }} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WaiveForm))
