import React from 'react'
import './Map.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog';
import './Todo.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import defaultimg from './TodoExtension/defalt.jpg'
import Loading from '../../../../Components/Loading'
import TeacherProfile from './TodoExtension/Profile'

let searchCourse=[]

const customContentStyle = {
    maxWidth: 'none',
    maxHeight: 'none',
};
const customteacherContentStyle = {
    width: '100%',
    maxWidth: 'none',
    maxHeight: 'none',
};

const bodyStyle = {
    fontFamily: 'Noto Sans CJK TC',
    color:'#454545'
};
const titleStyle = {
    fontFamily: 'Noto Sans CJK TC',
    color:'#565656'
};

const fontStyle={
    verticalAlign: "default",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    fontFamily: 'Noto Sans CJK TC',
}

class Todo extends React.Component {

    state = {
        isDone:false,
        open: false,
        opendia2:false,
        value:0,
        searchteachername:'',
        searchCourse:[],
        coursedata:[
          {
            "name":'蔡錫鈞 蔡錫鈞',
            "codes":[
              'DCP3573'
            ],
            "stuNum":[
              '76'
            ],
            "stuLimit":[
              '77'
            ],
            "english":[
              '否'
            ],
            "time":[
              '106-1-1212'
            ],
            "photo":'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/sctsai.jpg'
          },
          {
            name:'荊宇泰',
            codes:[
              'DCP1208'
            ],
            stuNum:[
              '71'
            ],
            stuLimit:[
              '80'
            ],
            english:[
              '是'
            ],
            time:[
              '104-2-1187'
            ],
            photo:'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/ytc.jpg'
          },
          {
            name:'陳健',
            codes:[
              'DCP3573',
              'DCP3573',
              'DCP3573',
              'DCP1208'
            ],
            stuNum:[
              '49',
              '91',
              '83',
              '112'
            ],
            stuLimit:[
              '74',
              '90',
              '80',
              '135'
            ],
            english:[
              '否',
              '否',
              '否',
              '是'
            ],
            time:[
              '106-1-1193',
              '105-2-1208',
              '104-2-1198',
              '103-2-1198'
            ],
            photo:'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/chienchen.jpg'
          },
          {
            name:'吳育松',
            codes:[
              'DCP3573',
              'DCP3573',
              'DCP3573'
            ],
            stuNum:[
              '95',
              '81',
              '140'
            ],
            stuLimit:[
              '90',
              '80',
              '135'
            ],
            english:[
              '否',
              '否',
              '否'
            ],
            time:[
              '105-2-1210',
              '104-2-1199',
              '103-2-1199'
            ],
            photo:'https://www.cs.nctu.edu.tw/cswebsite/assets/upload/people/ysw.jpg'
          }
        ]};

    initial = () => {
      let id = 0
      let _this = this
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
              info: '敬請期待',
            })

          }
        }

    }

  componentWillMount(){

      this.initial()
      this.setState({
        searchCourse: searchCourse
      })
    }


    handleOpen = () => {

      let _this = this

      axios.post('/students/courseMap/courseInfo', {
        cos_cname:_this.props.cosCame
      })
        .then(res => {
          this.setState({coursedata: res.data, isDone:true});
          let id = 0
          let searchCourse=[]
          res.data.map( data => {

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
                  info: '敬請期待',
                })
              }
            }
          )

          _this.setState({
            searchCourse: searchCourse,
            isDone:true
          })

        })
        .catch(err => {
          //window.location.replace("/logout ");
          console.log(err)
        })
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleChipClick = (name) => {
        this.setState({opendia2: true, searchteachername:name});
    }

    handleChange = (event, index, value)  => {
        this.setState({value:value-1});
    }

    handleDia2Close = () => this.setState({opendia2:false})

    getMenuItem = () => {
      let items = []
      let id = 0
      for (let j = 0; j < this.state.coursedata.length; j++) {
        for (let i = 0; i < this.state.coursedata[j].time.length; i++) {
          id++;
          //console.log(`${this.state.coursedata[j].time[i].match('^[0-9]*')}學年度 ${this.state.coursedata[j].time[i].charAt(4) === '1' ? '上學期' : '下學期'}   ${this.state.coursedata[j].name} 教授`)
          items.push(
            <MenuItem style={fontStyle} value={id} key={id - 1}
                      primaryText={`${this.state.coursedata[j].time[i].match('^[0-9]*')}學年度 ${this.state.coursedata[j].time[i].charAt(4) === '1' ? '上學期' : '下學期'}   ${this.state.coursedata[j].name} ${this.state.coursedata[j].name==="資工系"?'':'教授'}`}/>
              )
        }
      }
      return items
    }

    getinfo = () => {
        return (
            <div>
                <div style={{float:'left',}}>授課教授:&nbsp;&nbsp;&nbsp;
                  {this.state.searchCourse[this.state.value].teacher.split(" ").map(name=>

                    <MuiThemeProvider>
                      <Chip
                        onClick={()=>this.handleChipClick(name)}
                        labelStyle={fontStyle}
                        style={{
                          margin: 4,
                          float:'right',
                        }}
                      >
                        <Avatar src={this.state.searchCourse[this.state.value].photo===null?defaultimg:this.state.searchCourse[this.state.value].photo}/>
                        {name}
                      </Chip>
                    </MuiThemeProvider>
                  )}
                </div>
                <br/>
                <br/>
                <br/>
                <div style={{clear: 'left'}}>課號: &nbsp;{this.state.searchCourse[this.state.value].code}</div>
                <br/>
                <div style={{float:'left'}}>
                    時間:&nbsp;&nbsp;&nbsp;
                    <MuiThemeProvider>
                        <SelectField
                            value={this.state.value+1}
                            onChange={this.handleChange}
                            style={{float:'right', marginTop:'-15px', width:'500px'}}
                            maxHeight={200}
                            labelStyle={fontStyle}
                            selectedMenuItemStyle={{color:'#26A69A'}}
                        >
                            {this.getMenuItem()}
                        </SelectField>
                    </MuiThemeProvider>
                </div>
                <br/>
                <div style={{clear: 'left'}}>學生上限: &nbsp;{this.state.searchCourse[this.state.value].stuLimit}</div>
                <br/>
                <div>學生人數: &nbsp;{this.state.searchCourse[this.state.value].stuNum}</div>
                <br/>
                <div>英文授課: &nbsp;{this.state.searchCourse[this.state.value].english}</div>
                <br/>
                <div>簡介: &nbsp;{this.state.searchCourse[this.state.value].info}</div>
                <br/>
                <div>
                </div>
            </div>
        )
    }

    render(){
        const actions = [
            <FlatButton
                label="Exit"
                primary={true}
                style={{
                    fontFamily: 'Noto Sans CJK TC',
                    color: '#7B7B7B'
                }}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        const actions2 = [
            <FlatButton
                label="Exit"
                primary={true}
                style={{
                    fontFamily: 'Noto Sans CJK TC',
                    color: '#7B7B7B'
                }}
                keyboardFocused={true}
                onClick={this.handleDia2Close}
            />,
        ];
        return(
            <div className="course"
                 style={{
                     transition: 'all .2s',
                     opacity: !this.props.completed ? "1" : "0.2",
                 }}>
                 <MuiThemeProvider>
                     <FlatButton className="course-btn"
                          backgroundColor={"#616161"}
                          hoverColor={"#338d68"}
                          fullWidth={true}
                          labelStyle={{
                              padding: "5px",
                              height: "45px",
                              verticalAlign: "default",
                              color: "#fcfcfc",
                              fontSize: "1em",
                              fontWeight: "300",
                              letterSpacing: "1px",
                              fontFamily: 'Noto Sans CJK TC',
                          }}
                          style={{
                              background: this.props.pre_flag ? "#FF2D2D":"",
                              paddingRight: 0,
                              borderRadius:'5px'
                          }}
                          label={this.props.cosCame}
                          onClick={this.handleOpen}
                     />
                 </MuiThemeProvider>
                <MuiThemeProvider>
                <Dialog
                    title={this.props.cosCame}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    contentStyle={customContentStyle}
                    bodyStyle={bodyStyle}
                    titleStyle={titleStyle}
                    onRequestClose={this.handleClose}
                >


                    {(this.props.cosCame.match("化學")||this.props.cosCame.match("生物")||this.props.cosCame.match("物理")||this.props.cosCame.match("微積分"))?'暫無簡介':this.state.isDone?this.getinfo():<Loading size={300}
                                                                                                                                                                                                        left={400}
                                                                                                                                                                                                        top={20}
                                                                                                                                                                                                        isLoading={true}/>}
                    <MuiThemeProvider>
                        <Dialog
                            // title={this.state.searchteachername}
                            actions={actions2}
                            open={this.state.opendia2}
                            onRequestClose={this.handleDia2Close}
                            contentStyle={customteacherContentStyle}
                            bodyStyle={bodyStyle}
                            titleStyle={titleStyle}
                            autoScrollBodyContent={true}
                        >
                          <TeacherProfile name={this.state.searchteachername}/>
                        </Dialog>
                    </MuiThemeProvider>
                </Dialog>
                </MuiThemeProvider>
            </div>

        )
    }
}

export default Todo