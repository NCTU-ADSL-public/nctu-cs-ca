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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  }
})

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({

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

    const { classes, student } = this.props
    const { edit_panel_open } = this.state

    return (
      <Card className={classes.card}>
        <CardContent style = {{ display: 'flex' }}>
          <div style={{ width: '15%', display: 'block', textAlign: 'center' }}>
            <div style = {{ fontSize: '30px', fontWeight: 'bold' }}>{ student.name }</div>
            <div style = {{ fontSize: '15px', marginBottom: '10px' }}>{ student.id + ' / ' + student.program }</div>
            <CircularProgressbar
              percentage={100 * student.detail.total / 128}
              text = { student.detail.total.toString()}
              initialAnimation
              styles={{
                root: { maxWidth: '120px' },
                path: { stroke: '#34855e' },
                text: { fill: '#34855e', fontSize: '25px', fontWeight: 'bold' }
              }}
            />
            <div>
            {
              parseInt(student.detail.status) === 0 && <span>
                <Clear style = {{ fontSize: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
              </span>
              ||
              parseInt(student.detail.status) === 1 && <span>
                <QueryBuilder style = {{ fontSize: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
              </span>
              ||
              parseInt(student.detail.status) === 2 && <span>
                <Done style = {{ fontSize: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
              </span>
            }
            <div style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '15px', fontWeight: 'bold' }} >{ GRAD_STATUS_CN[student.detail.status] }</div>
            <span style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '15px', fontWeight: 'bold' }} > / { VERIFY_STATUS_CN[student.graduate_status] }</span>
            </div>
            <Button variant="contained" className = { classes.button } onClick = { () => this.setState({ edit_panel_open: true }) }>
              編輯預審狀態
            </Button>
            <Dialog onClose = { () => this.setState({ edit_panel_open: false })} open = { edit_panel_open } >
              <DialogTitle><div style = {{ fontSize: '20px' }} >畢業審核</div></DialogTitle>
              <div style = {{ padding: '10px 20px' }}>
                <hr style = {{ margin: '1px' }}/>
                <div>畢業狀態: { GRAD_STATUS_CN[student.detail.status] }</div>
                <div>預審狀況: { VERIFY_STATUS_CN[student.graduate_status] }</div>
              </div>

              { student.graduate_status === 1 && <div style = {{ display: 'flex', width: '400px' }} >
                <Button className = { classes.buttonCC } onClick = { () => this.setState({ edit_panel_open: false })}>取消</Button>
                <div style = {{ flex: 1 }} />
                <Button className = { classes.buttonNG }>未通過</Button>
                <Button className = { classes.buttonOK }>通過</Button>
              </div> }
            </Dialog>
          </div>
          <div style = {{ width: '85%', paddingLeft: '20px' }}>
            <div className = 'row' style = {{ display: 'flex', marginLeft: '20px' }}>
              <div style = {{ fontSize: '23px', float: 'left', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>必修</div>
              <div className = 'col-md-11 col-lg-11 col-xs-11'>
              {
                student.detail.compulse.length === 0 ?
                <Done className = { classes.ok } style = {{ fontSize: '30px', marginTop: '12px' }} />
                :
                <Tabs
                  scrollable
                  scrollButtons = "auto"
                  style = {{ width: '100%' }}
                >
                {
                  student.detail.compulse.map( (title) => (
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
            </div>
            <hr />
            <div style = {{ width: '100%' }}>
              <div className = 'row'>
                <div className = 'col-md-4 col-lg-4 col-xs-4' style = {{ marginTop: '25px' }}>
                  <div className = 'row' style = {{ marginTop: '10px' }} >
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      專業選修{ student.detail.pro <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.pro}</span> }
                    </div>
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      其他選修{ student.detail.other <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.other}</span> }
                    </div>
                  </div>
                  <div className = 'row' style = {{ marginTop: '10px' }} >
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      {"體　　育"}{ student.detail.pe <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.pe}</span> }
                    </div>
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      服務學習{ student.detail.service <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.service}</span> }
                    </div>
                  </div>
                  <div className = 'row' style = {{ marginTop: '10px' }} >
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      藝文護照{ student.detail.art <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.art}</span> }
                    </div>
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      導師時間{ student.detail.mentor <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.mentor}</span> }
                    </div>
                  </div>
                </div>
                <div className = 'col-md-5 col-lg-5 col-xs-5'
                  style = {{
                    margin: '5px',
                    border: '1px solid #dddddd',
                    borderRadius: '5px'
                  }}
                >
                  <div className = 'row' style = {{ fontSize: '20px', background: '#dddddd', padding: '5px', paddingLeft: '15px' }}>通識{
                    Math.min(student.detail.general.new.total, student.detail.general.old.total) <= 0 ?
                    <Done className = { classes.ok } style = {{ fontSize: '20px' }} />
                    :
                    <span className = { classes.error } style = {{ fontSize: '20px' }}>{ Math.min(student.detail.general.new.total, student.detail.general.old.total) }</span>
                  }</div>
                  <div className = 'row'>
                    <div className = 'col-md-5 col-lg-5 col-xs-5'>
                      <div className = 'row' style = {{ fontSize: '15px', width: '100%', margin: '0 auto', padding: '5px' }} >新制{
                        student.detail.general.new.total <= 0 ?
                        <Done className = { classes.ok } style = {{ marginLeft: '22px' }} />
                        :
                        <span className = { classes.error } style = {{ marginLeft: '22px' }} >{ student.detail.general.new.total }</span>
                      }</div>
                      <hr style = {{ margin: '1px' }}/>
                      <div className = 'row' style = {{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{"核　心"}{ student.detail.general.new.core <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.general.new.core}</span> }</div>
                      <div className = 'row' style = {{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{"跨　院"}{ student.detail.general.new.cross <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.general.new.cross}</span> }</div>
                      <div className = 'row' style = {{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{"校基本"}{ student.detail.general.new.basic <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.general.new.basic}</span> }</div>
                    </div>
                    <div className = 'col-md-7 col-lg-7 col-xs-7'>
                      <div className = 'row' style = {{ fontSize: '15px', width: '100%', margin: '0 auto', padding: '5px' }}>舊制{
                        student.detail.general.old.total <= 0 ?
                        <Done className = { classes.ok } />
                        :
                        <span className = { classes.error } >{ student.detail.general.old.total }</span>
                      }</div>
                      <hr style = {{ margin: '1px' }}/>
                      <div className = 'row' style = {{ marginLeft: '1px' }}>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          當代{ student.detail.general.old.contemp <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.general.old.contemp}</span> }
                        </div>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          文化{ student.detail.general.old.culture <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.general.old.culture}</span> }
                        </div>
                      </div>
                      <div className = 'row' style = {{ marginLeft: '1px' }}>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          歷史{ student.detail.general.old.history <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.general.old.history}</span> }
                        </div>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          公民{ student.detail.general.old.citizen <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.general.old.citizen}</span> }
                        </div>
                      </div>
                      <div className = 'row' style = {{ marginLeft: '1px' }}>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          群己{ student.detail.general.old.group <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.general.old.group}</span> }
                        </div>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          自然{ student.detail.general.old.science <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.general.old.science}</span> }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className = 'col-md-2 col-lg-2 col-xs-2'
                  style = {{
                    margin: '5px',
                    border: '1px solid #dddddd',
                    borderRadius: '5px'
                  }}
                >
                  <div className = 'row' style = {{ fontSize: '20px', background: '#dddddd', padding: '5px', paddingLeft: '15px' }}>外語{
                    student.detail.lang.total <= 0 ?
                    <Done className = { classes.ok } style = {{ fontSize: '20px' }} />
                    :
                    <span className = { classes.error } style = {{ fontSize: '20px' }} >{ student.detail.lang.total }</span>
                  }</div>
                  <div className = 'row' style = {{ fontSize: '16px', padding: '20px' }} >基礎{ student.detail.lang.basic_credit <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{student.detail.lang.basic_credit}</span> }</div>
                  <div className = 'row' style = {{ fontSize: '16px', padding: '20px' }} >進階{
                    (student.detail.lang.status === 0 ? student.detail.lang.advanced_course : student.detail.lang.advanced_credit)
                     <= 0 ? <Done className = { classes.ok } /> : <span className = { classes.error } >{
                       student.detail.lang.status === 0 ? student.detail.lang.advanced_course : student.detail.lang.advanced_credit
                     }</span>
                  }</div>
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
