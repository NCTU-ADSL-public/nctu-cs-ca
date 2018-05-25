import React from 'react'
import Show from './Show/index'
import Edit from  './Edit'
import axios from 'axios'
import firebase from 'firebase'
import PageWrapper from '../../../Components/PageWrapper'

let config = {
  apiKey: 'AIzaSyC64Eitf77FqUAMjjPaG1_rk3Sr6pyttoo',
  authDomain: 'code-86ba4.firebaseapp.com',
  databaseURL: 'https://code-86ba4.firebaseio.com',
  projectId: 'code-86ba4',
  storageBucket: 'code-86ba4.appspot.com',
  messagingSenderId: '354539568437'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
let storageRef = firebase.storage().ref()


export default class index extends React.Component {

  constructor (props) {

    super(props);
    this.changeState = this.changeState.bind(this)
    this.state = {
      project: this.props.project,
      Show: {
        title:this.props.project.research_title,
        url: '/ttt',
        introduce: '<h1>Hey! 這是我的簡介標題嘿嘿</h1>\n' +
        '\n' +
        '<p><em>我還可以有鞋字體喔~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~&nbsp; &nbsp;&nbsp;</em></p>\n' +
        '\n' +
        '<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n' +
        '\t<tbody>\n' +
        '\t\t<tr>\n' +
        '\t\t\t<td>還有表格</td>\n' +
        '\t\t\t<td>ㄏ ㄏ</td>\n' +
        '\t\t</tr>\n' +
        '\t\t<tr>\n' +
        '\t\t\t<td>6666</td>\n' +
        '\t\t\t<td>666</td>\n' +
        '\t\t</tr>\n' +
        '\t\t<tr>\n' +
        '\t\t\t<td>&nbsp;</td>\n' +
        '\t\t\t<td>&nbsp;</td>\n' +
        '\t\t</tr>\n' +
        '\t</tbody>\n' +
        '</table>\n' +
        '\n' +
        '<p>&nbsp;</p>\n' +
        '\n' +
        '<p><a id="你好" name="你好"></a></p>\n' +
        '\n' +
        '<h2><strong>&nbsp; 這樣介紹還OK嗎?</strong></h2>\n' +
        '\n' +
        '<p><img alt="" src="https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/_199.png" style="height:180px; width:140px" /></p>\n' +
        '\n' +
        '<p>&nbsp;</p>\n' +
        '\n' +
        '<p>發現我長得有點像豆豆先生</p>\n' +
        '\n' +
        '<p>&nbsp;</p>\n' +
        '\n' +
        '<p>&nbsp;</p>\n' +
        '\n' +
        '<p>&nbsp;</p>\n' +
        '\n' +
        '<p>&nbsp;</p>\n' +
        '\n' +
        '<p>&nbsp;</p>',
      },
      state:'show'
    }
  }

  componentWillMount () {
    this.fetchData()
    console.log(this.state.project.research_title)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData()
  }

  fetchData () {
    let _this = this
    axios.post('/students/projectPage', {
      student_id: _this.props.studentProfile.student_id,
    })
      .then(res => {
        let data = res.data
        let data_
        for(let i=0;i<data.length;i++){
          if(data[i].research_title === _this.state.project.research_title)
            data_ = data[i]
        }
        console.log(data_)
        console.log(_this.state.project.research_title)
        _this.setState({
          Show:{
            url:data_.link,
            title:data_.research_title,
            introduce:data_.intro
          }
        })
      })
      .catch(err => {
        console.log(err)
      })

      let pathReference = storageRef.child(_this.state.project.research_title + '/image/' + 'pp.png')
      pathReference.getDownloadURL().then(url => {
        _this.setState({
          Show:{
            image:url,
            url:_this.state.Show.url,
            title:_this.state.Show.title,
            introduce:_this.state.Show.introduce
          }
        })
      })

  }

  changeState () {
    let state =  this.state.state === 'edit'?'show':'edit'
    if(state === 'show'){
      this.fetchData()
    }
    this.setState({
      state:state
    })
    let _this = this
  }

  searchCallback = (item) => {
  }

  render () {

    return (
      <PageWrapper>
        {this.state.state === 'edit'?<Edit project={this.state.project} studentProfile={this.props.studentProfile} onclick = {this.changeState} show={this.state.Show}/>:<Show show={this.state.Show}/>}

        <div className='fixed-menu fixed' style={{display:`${this.state.state === 'edit'?'none':''}`}}>
          <div className='container'>
            <div className='pull-right'>
              <button className='btn btn-primary nav-button' onClick={this.changeState}>
                {this.state.state === 'edit'?'送出':'編輯'}
              </button>
            </div>
          </div>
        </div>
      </PageWrapper>
    )
  }
}


