import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgressbar from 'react-circular-progressbar'
import Clear from '@material-ui/icons/Clear';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import Done from '@material-ui/icons/Done';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import { setGradutateState } from '../../../Redux/Assistants/Actions/Graduation_v2/index'

const styles = theme => ({
  card: {
    marginTop: '10px'
  },
  tabRoot: {
    background: '#34855e',
    color: 'white',
    margin: '0 1px',
  },
  tabLabel: {
    fontSize: 15
  },
  border: {
    margin: '5px',
    border: '1px solid grey',
    borderRadius: '5px'
  },
  error: {
    fontSize: '15px',
    color: 'red',
    marginLeft: '20px',
    fontWeight: 'bold'
  },
  ok: {
    fontSize: '20px',
    marginLeft: '15px',
    fontWeight: 'bold',
    color: 'green',
    verticalAlign: 'middle',
  },
  button: {
    fontSize: '15px',
    marginTop: '10px'
  },
  buttonCC: {
    fontSize: '15px',
    margin: '5px',
    color: 'grey',
  },
  buttonNG: {
    fontSize: '15px',
    margin: '5px',
    color: 'red',
  },
  buttonOK: {
    fontSize: '15px',
    margin: '5px',
    color: 'blue',
  },
  hover: {
    fontSize: '15px',
    position: 'relative',
    right: '-220px'
  }
})

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  set_graduate_state: post_item => dispatch(setGradutateState(post_item))
})

const GRAD_STATUS_CN = ['未符合', '將符合', '已符合']
const VERIFY_STATUS_CN = ['未送審', '審核中', '已通過', '未通過']

class ListPanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit_panel_open: false
    }
  }

  render() {

    const { classes, student, set_graduate_state } = this.props
    const { edit_panel_open } = this.state

    return (
      <Card className={classes.card} >
        <CardContent style = {{ display: 'flex' }}>
          <div style={{ width: '15%', display: 'block', textAlign: 'center' }}>
            <div style = {{ fontSize: '30px', fontWeight: 'bold' }} >{ student.sname }
              <OpenInNew style = {{
                fontSize: '20px',
                marginLeft: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                verticalAlign: 'middle'}}
                onClick = { () => window.open('/assistants/head/s/' + student.student_id) }
              />
            </div>
            <div style = {{ fontSize: '15px', marginBottom: '10px' }}>{ student.student_id + ' / ' + student.program }</div>
            <CircularProgressbar
              percentage={100 * student.total_credit / 128}
              text = { student.total_credit ? student.total_credit.toString() : "error" }
              initialAnimation
              styles={{
                root: { maxWidth: '120px' },
                path: { stroke: '#34855e' },
                text: { fill: '#34855e', fontSize: '25px', fontWeight: 'bold' }
              }}
            />
            <div>
            {
              parseInt(student.graduate_status) === 0 && <span>
                <Clear style = {{ fontSize: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
              </span>
              ||
              parseInt(student.graduate_status) === 1 && <span>
                <QueryBuilder style = {{ fontSize: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
              </span>
              ||
              parseInt(student.graduate_status) === 2 && <span>
                <Done style = {{ fontSize: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
              </span>
            }
            <div style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '15px', fontWeight: 'bold' }} >{ GRAD_STATUS_CN[student.graduate_status] }</div>
            <span style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '15px', fontWeight: 'bold' }} > / { VERIFY_STATUS_CN[student.submit_status] }</span>
            </div>
            <Button variant="contained" className = { classes.button } onClick = { () => this.setState({ edit_panel_open: true }) }>
              編輯預審狀態
            </Button>
            <Dialog onClose = { () => this.setState({ edit_panel_open: false })} open = { edit_panel_open } >
              <DialogTitle><div style = {{ fontSize: '20px' }} >畢業審核</div></DialogTitle>
              <div style = {{ padding: '10px 20px' }}>
                <hr style = {{ margin: '1px' }}/>
                <div>畢業狀態: { GRAD_STATUS_CN[student.graduate_status] }</div>
                <div>預審狀況: { VERIFY_STATUS_CN[student.submit_status] }</div>
              </div>

              { student.submit_status === 1 && <div style = {{ display: 'flex', width: '400px' }} >
                <Button className = { classes.buttonCC } onClick = { () => this.setState({ edit_panel_open: false })}>取消</Button>
                <div style = {{ flex: 1 }} />
                <Button className = { classes.buttonNG } onClick = {
                  () => {
                    this.setState({ edit_panel_open: false }),
                    set_graduate_state({ student_id: student.student_id, graduate_submit: 3 })
                  }
                }>未通過</Button>
                <Button className = { classes.buttonOK } onClick = {
                  () => {
                    this.setState({ edit_panel_open: false }),
                    set_graduate_state({ student_id: student.student_id, graduate_submit: 2 })
                  }
                }>通過</Button>
              </div> }
            </Dialog>
          </div>
          <div style = {{ width: '85%', paddingLeft: '20px' }}>
            <div className = 'row' style = {{ display: 'flex', marginLeft: '20px' }}>
              <div style = {{ fontSize: '23px', float: 'left', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>必修</div>
              <div className = 'col-md-7 col-lg-7 col-xs-7'>
              {
                student.compulse.length === 0 ?
                <Done className = { classes.ok } style = {{ fontSize: '30px', marginTop: '12px' }} />
                :
                <Tabs
                  scrollable
                  scrollButtons = "auto"
                  style = {{ width: '100%' }}
                >
                {
                  student.compulse.map( (title) => (
                    <Tab label = { title } classes = {{
                      root: classes.tabRoot,
                      label: classes.tabLabel,
                      selected: classes.tabSelected
                    }} />
                  ))
                }
                </Tabs>
              }
              </div>
              { student.program === '網多'　&&
                <div className = 'col-md-4 col-lg-4 col-xs-4' style = {{ display: 'flex' }}>
                  <div style = {{ fontSize: '23px', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>網多專選</div>
                  <div style = {{ display: 'block', marginLeft: '20px', marginTop: '5px' }}>
                    <div>{"網　路"}<span>{ student.net <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.net}</span> }</span></div>
                    <div>多媒體<span>{ student.media <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.media}</span> }</span></div>
                  </div>
                </div>
              }
            </div>
            <hr />
            <div style = {{ width: '100%' }}>
              <div className = 'row'>
                <div className = 'col-md-1 col-lg-1 col-xs-1' style = {{ marginTop: '25px' }} />
                <div className = 'col-md-4 col-lg-4 col-xs-4' style = {{ marginTop: '25px' }}>
                  <div className = 'row' style = {{ marginTop: '10px' }} >
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      專業選修{ student.pro <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.pro}</span> }
                    </div>
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      其他選修{ student.other <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.other}</span> }
                    </div>
                  </div>
                  <div className = 'row' style = {{ marginTop: '10px' }} >
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      {"體　　育"}{ student.pe <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.pe}</span> }
                    </div>
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      服務學習{ student.service <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.service}</span> }
                    </div>
                  </div>
                  <div className = 'row' style = {{ marginTop: '10px' }} >
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      藝文護照{ student.art <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.art}</span> }
                    </div>
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      導師時間{ student.mentor <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.mentor}</span> }
                    </div>
                  </div>
                </div>
                <div className = 'col-md-3 col-lg-3 col-xs-3'
                  style = {{
                    margin: '5px',
                    border: '1px solid #dddddd',
                    borderRadius: '5px'
                  }}
                >
                  <div className = 'row' style = {{ fontSize: '20px', background: '#dddddd', padding: '5px', paddingLeft: '15px' }}>通識</div>
                  <div className = 'row'>
                    {
                      student.submit_type !== 1 ?
                      <div className = 'col-md-12 col-lg-12 col-xs-12'>
                        <div className = 'row' style = {{ fontSize: '15px', width: '100%', margin: '0 auto', padding: '5px' }}>舊制{
                          student.old_total <= 0 ?
                          <Done className = { classes.ok } />
                          :
                          <span className = { classes.error } >{ student.old_total }</span>
                        }</div>
                        <hr style = {{ margin: '1px' }}/>
                        <div className = 'row' style = {{ marginLeft: '1px' }}>
                          <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                            當代{ student.old_contemp <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.old_contemp}</span> }
                          </div>
                          <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                            文化{ student.old_culture <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.old_culture}</span> }
                          </div>
                        </div>
                        <div className = 'row' style = {{ marginLeft: '1px' }}>
                          <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                            歷史{ student.old_history <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.old_history}</span> }
                          </div>
                          <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                            公民{ student.old_citizen <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.old_citizen}</span> }
                          </div>
                        </div>
                        <div className = 'row' style = {{ marginLeft: '1px' }}>
                          <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                            群己{ student.old_group <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.old_group}</span> }
                          </div>
                          <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                            自然{ student.old_science <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.old_science}</span> }
                          </div>
                        </div>
                      </div>
                      :
                      <div className = 'col-md-12 col-lg-12 col-xs-12'>
                        <div className = 'row' style = {{ fontSize: '15px', width: '100%', margin: '0 auto', padding: '5px' }} >新制{
                          student.new_total <= 0 ?
                          <Done className = { classes.ok } style = {{ marginLeft: '22px' }} />
                          :
                          <span className = { classes.error } style = {{ marginLeft: '22px' }} >{ student.new_total }</span>
                        }</div>
                        <hr style = {{ margin: '1px' }}/>
                        <Tooltip title={"人文: " + student.new_core_humanity + "　社會: " + student.new_core_society } placement="left" classes = {{ tooltip: classes.hover }}>
                          <div className = 'row' style = {{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >
                            {"核　心"}{ student.new_core_total <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{ student.new_core_total }</span> }
                          </div>
                        </Tooltip>
                        <div className = 'row' style = {{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{"跨　院"}{ student.new_cross <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.new_cross}</span> }</div>
                        <div className = 'row' style = {{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{"校基本"}{ student.new_basic <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.new_basic}</span> }</div>
                      </div>
                    }
                  </div>
                </div>
                <div className = 'col-md-2 col-lg-2 col-xs-2'
                  style = {{
                    margin: '5px',
                    border: '1px solid #dddddd',
                    borderRadius: '5px'
                  }}
                >
                  <div className = 'row' style = {{ fontSize: '20px', background: '#dddddd', padding: '5px', paddingLeft: '15px' }}>外語 /
                    <span style = {{ fontSize: '15px', marginLeft: '5px' }} >畢業門檻</span> {student.en_status !== 0 ? <Done style = {{ fontSize: '15px', color: 'green' }} /> : <Clear style = {{ fontSize: '15px', color: 'red'}} /> }
                  </div>
                  <div className = 'row' style = {{ fontSize: '16px', padding: '20px' }} >基礎{ student.en_basic <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.en_basic}</span> }</div>
                  <div className = 'row' style = {{ fontSize: '16px', padding: '20px' }} >進階{ student.en_advanced <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.en_advanced}</span> }</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListPanel))
