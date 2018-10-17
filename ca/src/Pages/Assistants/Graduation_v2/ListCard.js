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
    fontSize: '15px',
    marginLeft: '15px',
    fontWeight: 'bold',
    color: 'green',
    verticalAlign: 'middle',
  }
})

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({

})

const GRAD_STATUS_CN = ['未符合', '將符合', '已符合']

class ListPanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    const { classes, student } = this.props

    return (
      <Card className={classes.card}>
        <CardContent style = {{ display: 'flex' }}>
          <div style={{ width: '15%', display: 'block' }}>
            <div style = {{ fontSize: '30px', fontWeight: 'bold' }}>{ student.name }</div>
            <div style = {{ fontSize: '15px', marginBottom: '10px' }}>{ student.id + ' / ' + student.program }</div>
            <CircularProgressbar
              percentage={100 * student.total / 128}
              text={student.total}
              initialAnimation
              styles={{
                root: { maxWidth: '120px' },
                path: { stroke: '#34855e' },
                text: { fill: '#34855e', fontSize: '25px', fontWeight: 'bold' }
              }}
            />
            <div>
            {
              parseInt(student.status) === 0 && <span>
                <Clear style = {{ fontSize: '25px', verticalAlign: 'middle', marginRight: '5px' }} />
                <div style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '25px', fontWeight: 'bold' }} >未符合</div>
              </span>
              ||
              parseInt(student.status) === 1 && <span>
                <QueryBuilder style = {{ fontSize: '25px', verticalAlign: 'middle', marginRight: '5px' }} />
                <div style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '25px', fontWeight: 'bold' }} >將符合</div>
              </span>
              ||
              parseInt(student.status) === 2 && <span>
                <Done style = {{ fontSize: '25px', verticalAlign: 'middle', marginRight: '5px' }} />
                <div style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '25px', fontWeight: 'bold' }} >已符合</div>
              </span>
            }
            </div>
          </div>
          <div style = {{ width: '85%', paddingLeft: '20px' }}>
            <div className = 'row' style = {{ display: 'flex', marginLeft: '20px' }}>
              <div style = {{ fontSize: '23px', float: 'left', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>必修</div>
              <div className = 'col-md-11 col-lg-11 col-xs-11'>
                <Tabs
                  scrollable
                  scrollButtons = "auto"
                  style = {{ width: '100%' }}
                >
                  <Tab label="資訊工程專題(一)" classes = {{
                    root: classes.tabRoot,
                    label: classes.tabLabel,
                    selected: classes.tabSelected
                  }} />
                  <Tab label="物件導向程式設計與資料結構" classes = {{
                    root: classes.tabRoot,
                    label: classes.tabLabel,
                    selected: classes.tabSelected
                  }} />
                  <Tab label="Item Three" classes = {{
                    root: classes.tabRoot,
                    label: classes.tabLabel,
                    selected: classes.tabSelected
                  }} />
                  <Tab label="Item Four" classes = {{
                    root: classes.tabRoot,
                    label: classes.tabLabel,
                    selected: classes.tabSelected
                  }} />
                  <Tab label="Item Five" classes = {{
                    root: classes.tabRoot,
                    label: classes.tabLabel,
                    selected: classes.tabSelected
                  }} />
                  <Tab label="Item Six" classes = {{
                    root: classes.tabRoot,
                    label: classes.tabLabel,
                    selected: classes.tabSelected
                  }} />
                  <Tab label="Item Seven" classes = {{
                    root: classes.tabRoot,
                    label: classes.tabLabel,
                    selected: classes.tabSelected
                  }} />
                </Tabs>
              </div>
            </div>
            <hr />
            <div style = {{ width: '100%' }}>
              <div className = 'row'>
                <div className = 'col-md-4 col-lg-4 col-xs-4' style = {{ marginTop: '25px' }}>
                  <div className = 'row' style = {{ marginTop: '10px' }} >
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      專業選修<span className = { classes.error } >2</span>
                    </div>
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      其他選修<span className = { classes.error } >2</span>
                    </div>
                  </div>
                  <div className = 'row' style = {{ marginTop: '10px' }} >
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      {"體　　育"}<span className = { classes.error } >2</span>
                    </div>
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      服務學習<span className = { classes.error } >2</span>
                    </div>
                  </div>
                  <div className = 'row' style = {{ marginTop: '10px' }} >
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      藝文護照<Done className = { classes.ok } />
                    </div>
                    <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '15px', padding: '5px' }}>
                      導師時間<span className = { classes.error } >1</span>
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
                  <div className = 'row' style = {{ fontSize: '20px', background: '#dddddd', padding: '5px', paddingLeft: '15px' }}>通識<span className = { classes.error } >4</span></div>
                  <div className = 'row'>
                    <div className = 'col-md-5 col-lg-5 col-xs-5'>
                      <div className = 'row' style = {{ fontSize: '15px', width: '100%', margin: '0 auto', padding: '5px' }} >新制<span className = { classes.error } >4</span></div>
                      <hr style = {{ margin: '1px' }}/>
                      <div className = 'row' style = {{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{"核　心"}<span className = { classes.error } >2</span></div>
                      <div className = 'row' style = {{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{"跨　院"}<Done className = { classes.ok } /></div>
                      <div className = 'row' style = {{ fontSize: '13px', marginLeft: '1px', padding: '5px' }} >{"校基本"}<span className = { classes.error } >2</span></div>
                    </div>
                    <div className = 'col-md-7 col-lg-7 col-xs-7'>
                      <div className = 'row' style = {{ fontSize: '15px', width: '100%', margin: '0 auto', padding: '5px' }}>舊制<span className = { classes.error } >6</span></div>
                      <hr style = {{ margin: '1px' }}/>
                      <div className = 'row' style = {{ marginLeft: '1px' }}>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          當代<Done className = { classes.ok } />
                        </div>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          文化<span className = { classes.error } >2</span>
                        </div>
                      </div>
                      <div className = 'row' style = {{ marginLeft: '1px' }}>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          歷史<span className = { classes.error } >2</span>
                        </div>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          公民<Done className = { classes.ok } />
                        </div>
                      </div>
                      <div className = 'row' style = {{ marginLeft: '1px' }}>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          群己<Done className = { classes.ok } />
                        </div>
                        <div className = 'col-md-6 col-lg-6 col-xs-6' style = {{ fontSize: '13px', padding: '5px' }}>
                          自然<Done className = { classes.ok } />
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
                  <div className = 'row' style = {{ fontSize: '20px', background: '#dddddd', padding: '5px', paddingLeft: '15px' }}>外語<Done className = { classes.ok } /></div>
                  <div className = 'row' style = {{ fontSize: '18px', padding: '19px' }} >基礎<Done className = { classes.ok } /></div>
                  <div className = 'row' style = {{ fontSize: '18px', padding: '19px' }} >進階<Done className = { classes.ok } /></div>
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
