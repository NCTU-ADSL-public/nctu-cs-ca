import React from 'react'
import './Map.css'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from '../reducers'
import {addTodo, reviseselectvalue, reviseEdgeinfo} from '../actions/index'
import App from './App'
import {Gitnode, GitEdgePre, GitEdgeSug} from './NodeExtension';
import Graph from 'react-json-graph';

import MapsLocation from './MapsLocation.json'
import MapsLocation3 from './MapsLocationV2.json'
//import Graph from 'react-json-graph';

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
//for select
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

let store = createStore(todoApp)

let flag = 1
let datai=[]
let datar=[]
let edgepre=[]
let edgesug=[]

const fontStyle={
    verticalAlign: "default",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    fontFamily: 'Noto Sans CJK TC',
}


const infpTiltleStyle={
    float:'left',
    verticalAlign: "default",
    fontSize: "1em",
    fontWeight: "700",
    letterSpacing: "1px",
    fontFamily: 'Noto Sans CJK TC',
    margin:'70px 110px 20px 40px',
    color:"#7B7B7B"
}


class Map extends React.Component {
      constructor (props) {
            super(props)
            this.state = {
                slideIndex: 0,
              location:(this.props.studentsGrad==="大一" || this.props.studentsGrad==="大二" )?MapsLocation:MapsLocation3
            };
      }

      state = {
          value: 1,
          data:[],
          datar:[]
      };

      handleChange = (event, index, value) => {

              if(value===1){
                  this.setState({
                      data:{
                          "label": "git",
                          "isVertical": 0,
                          "isStatic": 1,
                          "nodes":datai,
                          "edges": []
                      }
                  })
              }
              else if(value===2){
                  this.setState({
                      data:{
                          "label": "git",
                          "isVertical": 0,
                          "isStatic": 1,
                          "nodes":datai,
                          "edges": edgepre
                      }
                  })
              }
              else{
                  this.setState({
                      data:{
                          "label": "git",
                          "isVertical": 0,
                          "isStatic": 1,
                          "nodes":datai,
                          "edges": edgesug
                      }
                  })
              }
          this.setState({value});
          store.dispatch(reviseselectvalue(value))
      }

      onChange = (value) => {
          this.setState({
              slideIndex: value,
          });
      };

    async componentWillMount(){
          await this.SavingCourseData()
          this.setState({
              data:{
                "label": "git",
                "isVertical": 0,
                  "isStatic": 1,
                "nodes":datai,
                "edges": []
              },
              datar:datar,
              location:Object.keys(MapsLocation).map(function(key) {
                let user = MapsLocation[key];
                user.id = key;
                return user;
              })
          })
      }

    getEdgeColor(){
        if(this.state.value===2) {
          return GitEdgePre
        }
        else if(this.state.value===3) {
          return GitEdgeSug
        }
    }

    SavingCourseData () {
        if (flag === 1) {
          flag = 0

          for (let i = 0; i < this.props.data.length; i++) {
            if (i !== 0) {
              if (this.props.data[i - 1].cos_cname !== this.props.data[i].cos_cname) {
                  let complete=0
                  for(let j=0;j<this.props.studentPasdata.length;j++){
                      if((this.props.studentPasdata[j].cos_cname === "微積分甲 (二) " && this.props.data[i].cos_cname === "微積分(二)") || (this.props.studentPasdata[j].cos_cname === "微積分甲 (一) " && this.props.data[i].cos_cname === "微積分(一)") || this.props.studentPasdata[j].cos_cname === this.props.data[i].cos_cname || this.props.studentPasdata[j].cos_cname  === this.props.data[i].cos_cname + "(英文授課)" || this.props.studentPasdata[j].cos_cname=== this.props.data[i].cos_cname + "(檢定考試)"  )complete=1
                  }
                  store.dispatch(addTodo(this.props.data[i].cos_cname, this.props.data[i].grade, this.props.data[i].semester, this.props.data[i].suggest, this.props.data[i].pre,complete))
              }
            } else {
                let complete=0
                for(let j=0;j<this.props.studentPasdata.length;j++){
                    if((this.props.studentPasdata[j].cos_cname === "微積分甲 (二) " && this.props.data[i].cos_cname === "微積分(二)") || (this.props.studentPasdata[j].cos_cname === "微積分甲 (一) " && this.props.data[i].cos_cname === "微積分(一)") || this.props.studentPasdata[j].cos_cname === this.props.data[i].cos_cname || this.props.studentPasdata[j].cos_cname === this.props.data[i].cos_cname  + "(英文授課)"  || this.props.studentPasdata[j].cos_cname=== this.props.data[i].cos_cname + "(檢定考試)"   )complete=1
                }
                store.dispatch(addTodo(this.props.data[i].cos_cname, this.props.data[i].grade, this.props.data[i].semester, this.props.data[i].suggest, this.props.data[i].pre,complete))
            }
          }



          let nx=-200
          let id=0
          let semflag=0;

          let semcount = 0
          let semarr = ["大一 上", "大一 下", "大二 上", "大二 下", "大三 上", "大三 下", "大四 上" , "大四 下" ]

          for (let i = 0; i < this.props.data.length; i++) {
              id++
              if (i !== 0) {
                  if (this.props.data[i - 1].cos_cname !== this.props.data[i].cos_cname) {
                      if(semflag !== this.props.data[i].semester) {
                          semflag = this.props.data[i].semester
                          nx += 220
                          datai.push({"id":(id++).toString(),"label": semarr[semcount],"position":{"x": nx,"y": 0},
                            "size": {
                              "width": 80,
                              "height": 50
                            }})
                          semcount++
                      }
                    let ny = this.state.location.filter( t =>(t.cos_cname === this.props.data[i].cos_cname || (t.cos_cname + "(英文授課)") === this.props.data[i].cos_cname || (t.cos_cname + "(檢定考試)") === this.props.data[i].cos_cname || (t.cos_cname + " ") === this.props.data[i].cos_cname))[0].ny + 50
                      datai.push({"id":(id).toString(),"label": this.props.data[i].cos_cname,"position":{"x": nx,"y": ny},
                          "size": {
                              "width": 80,
                              "height": 50
                          }})
                      datar.push({"id":(id).toString(),"label": this.props.data[i].cos_cname,pre:this.props.data[i].pre,suggest:this.props.data[i].suggest})
                  }
              } else {
                  if(semflag !== this.props.data[i].semester) {
                      semflag = this.props.data[i].semester
                      nx += 220
                      datai.push({"id":(id++).toString(),"label": semarr[semcount],"position":{"x": nx,"y": 0},
                        "size": {
                          "width": 80,
                          "height": 50
                        }})
                      semcount++
                  }
                  let ny = this.state.location.filter( t =>(t.cos_cname === this.props.data[i].cos_cname || (t.cos_cname + "(英文授課)") === this.props.data[i].cos_cname || (t.cos_cname + "(檢定考試)") === this.props.data[i].cos_cname || (t.cos_cname + " ") === this.props.data[i].cos_cname))[0].ny + 50
                  datai.push({"id":(id).toString(),"label": this.props.data[i].cos_cname,"position":{"x": nx,"y": ny},
                      "size": {
                          "width": 80,
                          "height": 50
                      }})
                  datar.push({"id":(id).toString(),"label": this.props.data[i].cos_cname,pre:this.props.data[i].pre,suggest:this.props.data[i].suggest})

              }
          }


          for (let i = 0; i < datar.length; i++) {
              if(datar[i].pre !== null){
                  for(let j=0;j<=i;j++){
                      if(datar[j].label === datar[i].pre){
                          edgepre.push({
                              "source": datar[j].id,
                              "target": datar[i].id
                          })
                      }
                  }
              }
              if(datar[i].suggest !== null){
                  for(let j=0;j<=i;j++){
                      if(datar[j].label === datar[i].suggest){
                          edgesug.push({
                              "source": datar[i].id,
                              "target": datar[j].id
                          })
                      }
                  }
              }
          }

    }
  }

  render () {
      const width = document.body.clientWidth;
      const height = document.body.clientHeight + 10;
      const heightWrap = height;
    return <div>
      <div className="selectFieldStyle animated bounceInRight"
           style={{display: this.state.slideIndex ? '' : 'none'}}>
        <div>
          <MuiThemeProvider>
            <SelectField
              floatingLabelText="選取查看事項"
              value={this.state.value}
              onChange={this.handleChange}
              labelStyle={fontStyle}
              selectedMenuItemStyle={{color: '#26A69A'}}
              floatingLabelStyle={{
                color: '#a42926',
                verticalAlign: 'default',
                fontSize: '1em',
                fontWeight: '300',
                letterSpacing: '1px',
                fontFamily: 'Noto Sans CJK TC',
              }}
            >
              <MenuItem style={fontStyle} value={1} primaryText="無"/>
              <MenuItem style={fontStyle} value={2} primaryText="擋修"/>
              <MenuItem style={fontStyle} value={3} primaryText="建議修課"/>
            </SelectField>
          </MuiThemeProvider>
        </div>
        <div>
          <div className="green" style={{backgroundColor: '#616161'}}></div>
          <div className="text">已通過</div>
          <div className="red" style={{backgroundColor: '#a42926'}}></div>
          <div className="text">未通過</div>
        </div>
      </div>
      <Provider store={store}>
        <div className='Map-title-text'>
          <MuiThemeProvider>
            <Tabs
              onChange={this.onChange}
              value={this.state.slideIndex}
              style={{color: '#26A69A'}}
              inkBarStyle={{backgroundColor: '#8b8b8b'}}

            >
              <Tab label="課程" value={0} buttonStyle={fontStyle}/>
              <Tab label="地圖" value={1} buttonStyle={fontStyle}/>
            </Tabs>
          </MuiThemeProvider>

            <div className='Map-Row'>
              <App studentPasdata={this.props.studentPasdata} data={this.props.data}
                   studentsGrad={this.props.studentsGrad}/>
            </div>
            <div style={{marginLeft: '-70px', marginTop: '-20px'}}>
              <div>

                {/*<div style={MapTiltleStyle}>大四 下</div>*/}
                {/*<Graph*/}
                  {/*width='2000px'*/}
                  {/*height={height}*/}
                  {/*json={this.state.data}*/}
                  {/*onChange={(newGraphJSON) => {}}*/}
                  {/*Node={Gitnode}*/}
                  {/*Edge={this.getEdgeColor()}*/}
                {/*/>*/}
              </div>
            </div>
        </div>
      </Provider>

    </div>
  }
}

export default Map
