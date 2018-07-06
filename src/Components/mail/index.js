import React from 'react'
import './index.css'
import axios from 'axios'

//for table
import Table from './Table'
import FlatButton from 'material-ui/FlatButton'

//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  filter: {
    padding: '50px 4% 0 8%',
  },
}

export default class Mail extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      data: [],
      realdata: [],
      action:'mail',

    }

    this.filterList = this.filterList.bind(this)
  }

  componentWillMount () {
    let _this = this
    axios.post('/mail/inbox', {
      id: _this.props.id
    })
      .then(res => {
        _this.setState({
          action:'mail',
          data:res.data,
          realdata:res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    this.setState({items: this.props.items})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({items: nextProps.items})
    }
  }

  filterList (event) {
    let updatedList = this.state.realdata
    updatedList = updatedList.filter((item) => {
      return (
        (item.receiver.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1) ||
        (item.sender.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1)||
        (item.title.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1)
      )
    })
    this.setState({data: updatedList})
  }

  searchCallback = (item) => {
    this.props.parentFunction(item)
  }

  handlemailaction = (action) => {
    let _this = this
    if(action === 'mail'){
      axios.post('/mail/inbox', {
        id: _this.props.id
      })
        .then(res => {
          _this.setState({
            action:action,
            data:res.data,
            realdata:res.data,
          })
        })
        .catch(err =>{
          window.location.reload('/logout')
          console.log(err)
        })
    }
    else if (action === 'sent'){
      axios.post('/mail/sent', {
        id: _this.props.id
      })
        .then(res => {
          _this.setState({
            action:action,
            data:res.data,
            realdata:res.data,
          })
        })
        .catch(err => {
          window.location.reload('/logout')
          console.log(err)
        })
    }
  }

  render () {
    return (
      <div style={styles.filter}>
        <div className='mail-button-list'>
          <FlatButton label='收件夾'
                      backgroundColor='#D3D3D3'
                      labelStyle={{
                        fontFamily: 'Noto Sans CJK TC',
                        fontWeight: 'bold',
                        color:'#778899'
                      }}
                      disabled={(this.state.action === 'mail')}
                      style={{width:'15vw', margin:'5',opacity:this.state.action==='mail'?'0.5':'1'}}
                      onClick={() => this.handlemailaction('mail')}
          />
          <FlatButton label='寄件備份'
                      backgroundColor='#D3D3D3'
                      labelStyle={{
                        fontFamily: 'Noto Sans CJK TC',
                        fontWeight: 'bold',
                        color:'#778899'
                      }}
                      disabled={(this.state.action === 'sent')}
                      style={{width:'15vw', margin:'5',opacity:this.state.action==='sent'?'0.5':'1'}}
                      onClick={() => this.handlemailaction('sent')}
          />
        </div>
        <div style={{width:'70vw',float:'right'}}>
          <div className="filter-list">
            <input type="text"
                   placeholder="搜尋"
                   onChange={this.filterList}
            />
          </div>
          <div
            style = {{
              height:'65vh',
              overflow: 'scroll'
            }}>
            <MuiThemeProvider>
              <Table tableData={this.state.data}
                     action={this.state.action}
                     parentFunction={this.searchCallback}
              />
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    )
  }
}
