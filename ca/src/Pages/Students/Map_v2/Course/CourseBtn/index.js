import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import axios from 'axios'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import withMobileDialog from '@material-ui/core/withMobileDialog/index'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Loading from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles/index'

let searchCourse = []

const styles = {
  appBar: {
    position: 'relative',
    background: '#5f9191'
  },
  progress: {
    position: 'relative',
    margin: '5px',
    color: 'gray'
  },
  flex: {
    flex: 1
  },
  titleStyle: {
    paddingTop: '1',
    color: '#c7b5ef'
  }
}

const fontStyle = {
  verticalAlign: 'default',
  fontSize: '1em',
  fontWeight: '300',
  letterSpacing: '1px',
  fontFamily: 'Noto Sans CJK TC'
}

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.initial = this.initial.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getMenuItem = this.getMenuItem.bind(this)
    this.getinfo = this.getinfo.bind(this)

    this.state = {
      isDone: false,
      open: false,
      opendia2: false,
      value: 0,
      searchteachername: '',
      searchCourse: [],
      coursedata: [
        {
          'name': '蔡錫鈞 蔡錫鈞',
          'codes': [
            'DCP3573'
          ],
          'stuNum': [
            '76'
          ],
          'stuLimit': [
            '77'
          ],
          'english': [
            '否'
          ],
          'time': [
            '106-1-1212'
          ],
          'photo': 'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/sctsai.jpg'
        },
        {
          name: '荊宇泰',
          codes: [
            'DCP1208'
          ],
          stuNum: [
            '71'
          ],
          stuLimit: [
            '80'
          ],
          english: [
            '是'
          ],
          time: [
            '104-2-1187'
          ],
          photo: 'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/ytc.jpg'
        },
        {
          name: '陳健',
          codes: [
            'DCP3573',
            'DCP3573',
            'DCP3573',
            'DCP1208'
          ],
          stuNum: [
            '49',
            '91',
            '83',
            '112'
          ],
          stuLimit: [
            '74',
            '90',
            '80',
            '135'
          ],
          english: [
            '否',
            '否',
            '否',
            '是'
          ],
          time: [
            '106-1-1193',
            '105-2-1208',
            '104-2-1198',
            '103-2-1198'
          ],
          photo: 'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/chienchen.jpg'
        },
        {
          name: '吳育松',
          codes: [
            'DCP3573',
            'DCP3573',
            'DCP3573'
          ],
          stuNum: [
            '95',
            '81',
            '140'
          ],
          stuLimit: [
            '90',
            '80',
            '135'
          ],
          english: [
            '否',
            '否',
            '否'
          ],
          time: [
            '105-2-1210',
            '104-2-1199',
            '103-2-1199'
          ],
          photo: 'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/ysw.jpg'
        }
      ]
    }
  }

  componentWillMount () {
    this.initial()
    this.setState({
      searchCourse: searchCourse
    })
  }

  initial () {
    let id = 0
    for (let j = 0; j < this.state.coursedata.length; j++) {
      for (let i = 0; i < this.state.coursedata[j].time.length; i++) {
        id++
        searchCourse.push({
          id: id,
          teacher: this.state.coursedata[j].name,
          code: this.state.coursedata[j].codes[i],
          stuLimit: this.state.coursedata[j].stuLimit[i],
          stuNum: this.state.coursedata[j].stuNum[i],
          photo: this.state.coursedata[j].photo,
          english: this.state.coursedata[j].english[i],
          info: '敬請期待'
        })
      }
    }
  }

  handleOpen () {
    let _this = this

    axios.post('/students/courseMap/courseInfo', {
      cos_cname: _this.props.cos_cname
    })
      .then(res => {
        this.setState({ coursedata: res.data, isDone: true })
        let id = 0
        let searchCourse = []
        res.data.map(data => {
          for (let i = 0; i < data.time.length; i++) {
            id++
            searchCourse.push({
              id: id,
              teacher: data.name,
              code: data.codes[i],
              stuLimit: data.stuLimit[i],
              stuNum: data.stuNum[i],
              photo: data.photo,
              english: data.english[i],
              info: '敬請期待'
            })
          }
        }
        )

        _this.setState({
          searchCourse: searchCourse,
          isDone: true
        })
      })
      .catch(err => {
        // window.location.replace("/logout ");
        console.log(err)
      })
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  handleChange (event, index, value) {
    this.setState({ value: value - 1 })
  }

  getMenuItem () {
    let items = []
    let id = 0
    for (let j = 0; j < this.state.coursedata.length; j++) {
      for (let i = 0; i < this.state.coursedata[j].time.length; i++) {
        id++
        // console.log(`${this.state.coursedata[j].time[i].match('^[0-9]*')}學年度 ${this.state.coursedata[j].time[i].charAt(4) === '1' ? '上學期' : '下學期'}   ${this.state.coursedata[j].name} 教授`)
        items.push(
          <MenuItem style={fontStyle} value={id} key={id - 1}
            primaryText={`${this.state.coursedata[j].time[i].match('^[0-9]*')}學年度 ${this.state.coursedata[j].time[i].charAt(4) === '1' ? '上學期' : '下學期'}   ${this.state.coursedata[j].name} ${this.state.coursedata[j].name === '資工系' ? '' : '教授'}`} />
        )
      }
    }
    return items
  }

  getinfo () {
    return (
      <div style={{ marginTop: '20px' }}>
        <div style={{ float: 'left' }}>授課教授:&nbsp;&nbsp;&nbsp;
          {this.state.searchCourse[this.state.value].teacher.split(' ').map((name, index) =>

            <MuiThemeProvider key={index}>
              <Chip
                labelStyle={fontStyle}
                style={{
                  margin: 4,
                  float: 'right'
                }}
              >
                <Avatar src={this.state.searchCourse[this.state.value].photo === null ? '' : this.state.searchCourse[this.state.value].photo} />
                {name}
              </Chip>
            </MuiThemeProvider>
          )}
        </div>
        <br />
        <br />
        <br />
        <div style={{ clear: 'left' }}>課號: &nbsp;{this.state.searchCourse[this.state.value].code}</div>
        <br />
        <div style={{ float: 'left' }}>
          時間:&nbsp;&nbsp;&nbsp;
          <MuiThemeProvider>
            <SelectField
              value={this.state.value + 1}
              onChange={this.handleChange}
              style={{ float: 'right', marginTop: '-15px', width: '500px' }}
              maxHeight={200}
              labelStyle={fontStyle}
              selectedMenuItemStyle={{ color: '#26A69A' }}
            >
              {this.getMenuItem()}
            </SelectField>
          </MuiThemeProvider>
        </div>
        <br />
        <div style={{ clear: 'left' }}>學生上限: &nbsp;{this.state.searchCourse[this.state.value].stuLimit}</div>
        <br />
        <div>學生人數: &nbsp;{this.state.searchCourse[this.state.value].stuNum}</div>
        <br />
        <div>英文授課: &nbsp;{this.state.searchCourse[this.state.value].english}</div>
        <br />
        <div>簡介: &nbsp;{this.state.searchCourse[this.state.value].info}</div>
        <br />
        <div />
      </div>
    )
  }

  render () {
    const { fullScreen, classes } = this.props
    return (
      <div className='course'
        style={{
          transition: 'all .2s'
        }}>

        {/* <Button onClick={this.handleOpen} style={{fontSize: '12px'}} color="inherit">編輯</Button> */}
        <MuiThemeProvider>
          <FlatButton className='course-btn'
            backgroundColor={this.props.completed ? '#616161' : '#911a1a'}
            hoverColor={'#338d68'}
            fullWidth
            labelStyle={{
              padding: '5px',
              height: '45px',
              verticalAlign: 'default',
              color: '#fcfcfc',
              fontSize: '1em',
              fontWeight: '300',
              letterSpacing: '1px',
              fontFamily: 'Noto Sans CJK TC'
            }}
            style={{
              paddingRight: 0,
              borderRadius: '5px'
            }}
            label={this.props.cos_cname}
            onClick={this.handleOpen}
          />
        </MuiThemeProvider>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          fullScreen={fullScreen}
          maxWidth={'md'}
          fullWidth
        >
          <DialogTitle id='alert-dialog-title' style={{ background: '#5f9191', padding: '0' }}>

            <AppBar className={classes.appBar} >
              <Toolbar >
                <Typography variant='title' color='inherit' className={classes.flex} style={{ fontSize: '15px' }} >
                  {this.props.cos_cname}
                </Typography>
                <Button style={{ fontSize: '12px' }} color='inherit' onClick={this.handleClose}>
                  EXIT
                </Button>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent>
            {(this.props.cos_cname.match('化學') || this.props.cos_cname.match('生物') || this.props.cos_cname.match('物理') || this.props.cos_cname.match('微積分')) ? '暫無簡介' : this.state.isDone ? this.getinfo() : <Loading className={classes.progress} /> }
          </DialogContent>
        </Dialog>
      </div>

    )
  }
}

export default withStyles(styles)(withMobileDialog()(Todo))
