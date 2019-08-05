import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  ok: {
    fontSize: '20px',
    marginLeft: '15px',
    fontWeight: 'bold',
    color: 'green',
    verticalAlign: 'middle'
  },
  error: {
    fontSize: '15px',
    color: 'red',
    marginLeft: '20px',
    fontWeight: 'bold'
  },
  hover: {
    fontSize: '15px',
    position: 'relative',
    right: '-220px'
  }
})

class OtherCourse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { classes, student } = this.props

    return (
      <div style={{ width: '100%' }}>
        <div className='row'>
          <div className='col-md-1 col-lg-1 col-xs-1' style={{ marginTop: '25px' }} />
          <div className='col-md-4 col-lg-4 col-xs-4' style={{ marginTop: '25px' }}>
            <div className='row' style={{ marginTop: '10px' }} >
              <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '15px', padding: '5px' }}>
                專業選修{ student.pro <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.pro}</span> }
              </div>
              <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '15px', padding: '5px' }}>
                其他選修{ student.other <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.other}</span> }
              </div>
            </div>
            <div className='row' style={{ marginTop: '10px' }} >
              <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '15px', padding: '5px' }}>
                {'體　　育'}{ student.pe <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.pe}</span> }
              </div>
              <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '15px', padding: '5px' }}>
                服務學習{ student.service <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.service}</span> }
              </div>
            </div>
            <div className='row' style={{ marginTop: '10px' }} >
              <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '15px', padding: '5px' }}>
                藝文護照{ student.art <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.art}</span> }
              </div>
              <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '15px', padding: '5px' }}>
                導師時間{ student.mentor <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.mentor}</span> }
              </div>
            </div>
          </div>
          <div className='col-md-3 col-lg-3 col-xs-3'
            style={{
              margin: '5px',
              border: '1px solid #dddddd',
              borderRadius: '5px'
            }}
          >
            <div className='row' style={{ fontSize: '20px', background: '#dddddd', padding: '5px', paddingLeft: '15px' }}>通識</div>
            <div className='row'>
              {
                parseInt(student.submit_type, 10) !== 1
                  ? <div className='col-md-12 col-lg-12 col-xs-12'>
                    <div className='row' style={{ fontSize: '15px', width: '100%', margin: '0 auto', padding: '5px' }}>舊制{
                      student.old_total <= 0
                        ? <Done className={classes.ok} />
                        : <span className={classes.error} >{ student.old_total }</span>
                    }</div>
                    <hr style={{ margin: '1px' }} />
                    <div className='row' style={{ marginLeft: '1px' }}>
                      <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '13px', padding: '5px' }}>
                      當代{ student.old_contemp <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.old_contemp}</span> }
                      </div>
                      <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '13px', padding: '5px' }}>
                      文化{ student.old_culture <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.old_culture}</span> }
                      </div>
                    </div>
                    <div className='row' style={{ marginLeft: '1px' }}>
                      <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '13px', padding: '5px' }}>
                      歷史{ student.old_history <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.old_history}</span> }
                      </div>
                      <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '13px', padding: '5px' }}>
                      公民{ student.old_citizen <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.old_citizen}</span> }
                      </div>
                    </div>
                    <div className='row' style={{ marginLeft: '1px' }}>
                      <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '13px', padding: '5px' }}>
                      群己{ student.old_group <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.old_group}</span> }
                      </div>
                      <div className='col-md-6 col-lg-6 col-xs-6' style={{ fontSize: '13px', padding: '5px' }}>
                      自然{ student.old_science <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.old_science}</span> }
                      </div>
                    </div>
                  </div>
                  : <div className='col-md-12 col-lg-12 col-xs-12'>
                    <div className='row' style={{ fontSize: '15px', width: '100%', margin: '0 auto', padding: '5px' }} >新制{
                      student.new_total <= 0
                        ? <Done className={classes.ok} style={{ marginLeft: '22px' }} />
                        : <span className={classes.error} style={{ marginLeft: '22px' }} >{ student.new_total }</span>
                    }</div>
                    <hr style={{ margin: '1px' }} />
                    <Tooltip title={'人文: ' + student.new_core_humanity + '　社會: ' + student.new_core_society} placement='left' classes={{ tooltip: classes.hover }}>
                      <div className='row' style={{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >
                        {'核　心'}{ student.new_core_total <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{ student.new_core_total }</span> }
                      </div>
                    </Tooltip>
                    <div className='row' style={{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{'跨　院'}{ student.new_cross <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.new_cross}</span> }</div>
                    <div className='row' style={{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{'校基本'}{ student.new_basic <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.new_basic}</span> }</div>
                  </div>
              }
            </div>
          </div>
          <div className='col-md-3 col-lg-3 col-xs-3'
            style={{
              margin: '5px',
              border: '1px solid #dddddd',
              borderRadius: '5px'
            }}
          >
            <div className='row' style={{ fontSize: '20px', background: '#dddddd', padding: '5px', paddingLeft: '15px' }}>外語 /
              <span style={{ fontSize: '15px', marginLeft: '5px' }} >畢業門檻</span> {parseInt(student.en_status, 10) !== 0 ? <Done style={{ fontSize: '15px', color: 'green' }} /> : <Clear style={{ fontSize: '15px', color: 'red'}} /> }
            </div>
            <div className='row' style={{ fontSize: '16px', padding: '20px' }} >基礎{ student.en_basic <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.en_basic}</span> }</div>
            <div className='row' style={{ fontSize: '16px', padding: '20px' }} >進階{ student.en_advanced <= 0 ? <Done className={classes.ok} /> : <span className={classes.error} >{student.en_advanced}</span> }</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OtherCourse))