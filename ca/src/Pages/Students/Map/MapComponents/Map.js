import React from 'react'
import './Map.css'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from '../reducers'
import {addTodo} from '../actions/index'
import App from './App'
import {GitNode, GitEdgePre, GitEdgeSug} from './NodeExtension';
import Graph from 'react-json-graph';
import DragAndZoom from  'react-drag-and-zoom'
import Icon from 'material-ui/svg-icons/maps/directions-walk';

import FlatButton from 'material-ui/FlatButton';
//for tabs
// import 'rc-tabs/assets/index.css';
// import Tabs, { TabPane } from 'rc-tabs';
// import TabContent from 'rc-tabs/lib/SwipeableTabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

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


class Map extends React.Component {
      constructor (props) {
            super(props)
            this.SavingCourseData()
            this.state = {
                slideIndex: 0,
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
      }

      onChange = (value) => {
          this.setState({
              slideIndex: value,
          });
      };

    async componentWillMount(){
          this.setState({
              data:{
                "label": "git",
                "isVertical": 0,
                  "isStatic": 1,
                "nodes":datai,
                "edges": []
              },
              datar:datar
          })
      }

    componentDidMount(){
        console.log("data")
        console.log(this.props.data)

    }

    getEdgeColor(){
        if(this.state.value===2)
            return GitEdgePre
        else if(this.state.value===3)
            return GitEdgeSug
    }

    SavingCourseData () {
        if (flag === 1) {
          flag = 0

          for (let i = 0; i < this.props.data.length; i++) {
            if (i !== 0) {
              if (this.props.data[i - 1].cos_cname !== this.props.data[i].cos_cname) {
                  let complete=0
                  for(let j=1;j<this.props.studentPasdata.length;j++){
                      if(this.props.studentPasdata[j].cos_cname === this.props.data[i].cos_cname)complete=1
                  }
                  store.dispatch(addTodo(this.props.data[i].cos_cname, this.props.data[i].grade, this.props.data[i].semester, this.props.data[i].suggest, this.props.data[i].pre,complete))
              }
            } else {
                let complete=0
                for(let j=1;j<this.props.studentPasdata.length;j++){
                    if(this.props.studentPasdata[j].cos_cname === this.props.data[i].cos_cname)complete=1
                }
                store.dispatch(addTodo(this.props.data[i].cos_cname, this.props.data[i].grade, this.props.data[i].semester, this.props.data[i].suggest, this.props.data[i].pre,complete))
            }
          }



          let nx=-200
          let ny=0
          let id=0
          let semflag=0;

          let basic = 0
          let math = 0
          let computer=0

          for (let i = 0; i < this.props.data.length; i++) {
              id++
              if (i !== 0) {
                  if (this.props.data[i - 1].cos_cname !== this.props.data[i].cos_cname) {
                      if(semflag !== this.props.data[i].semester) {
                          basic = 0
                          math = 0
                          computer=0
                          semflag = this.props.data[i].semester
                          nx += 220
                          if(this.props.data[i].cos_cname.match('物理')!==null || this.props.data[i].cos_cname.match('化學')!==null || this.props.data[i].cos_cname.match('生物')!==null){
                              basic = 50
                              ny = basic
                          }
                          else if(this.props.data[i].cos_cname.match('作業系統概論')!==null ) {
                              ny = 600
                          }
                          else if(this.props.data[i].cos_cname.match('基礎程式設計')!==null ) {
                              ny = 280
                          }
                          else if(this.props.data[i].cos_cname.match('訊號與系統')!==null ) {
                              ny = 150
                          }
                          else if(this.props.data[i].cos_cname.match('數值方法')!==null ) {
                              ny = 150
                          }
                          else if(this.props.data[i].cos_cname.match('影像處理概論')!==null ) {
                              ny = 200
                          }
                          else if(this.props.data[i].cos_cname.match('計算機圖學概論')!==null ) {
                              ny = 240
                          }
                          else if(this.props.data[i].cos_cname.match('軟硬體協同設計概論與實作')!==null ) {
                              ny = 320
                          }
                          else if(this.props.data[i].cos_cname.match('計算機概論')!==null ) {
                              ny = 350
                          }
                          else if(this.props.data[i].cos_cname.match('正規語言')!==null ) {
                              ny = 200
                          }
                          else if(this.props.data[i].cos_cname.match('編譯器設計概論')!==null ) {
                              ny = 200
                          }
                          else if(this.props.data[i].cos_cname.match('資料結構')!==null ) {
                              ny = 280
                          }
                          else if(this.props.data[i].cos_cname.match('資訊工程研討')!==null ) {
                              computer += 200
                              ny = computer
                          }
                          else if(this.props.data[i].cos_cname.match('資訊工程專題')!==null ) {
                              ny = 280
                          }

                          else if(this.props.data[i].cos_cname.match('計算機網路概論')!==null ) {
                              ny = 700
                          }
                          else if(this.props.data[i].cos_cname.match('網路通訊原理')!==null ) {
                              ny = 700
                          }
                          else if(this.props.data[i].cos_cname.match('微積分')!==null || this.props.data[i].cos_cname.match('機率')!==null || this.props.data[i].cos_cname.match('線性代數')!==null|| this.props.data[i].cos_cname.match('離散數學')!==null){
                              math = 200
                              ny = math
                          }
                          else {
                              computer = 350
                              ny = computer
                          }
                      }
                      else{
                          if(this.props.data[i].cos_cname.match('物理')!==null || this.props.data[i].cos_cname.match('化學')!==null || this.props.data[i].cos_cname.match('生物')!==null){
                              if(basic===0)basic=50
                              else basic += 40
                              ny = basic
                          }
                          else if(this.props.data[i].cos_cname.match('作業系統概論')!==null ) {
                              ny = 600
                          }
                          else if(this.props.data[i].cos_cname.match('基礎程式設計')!==null ) {
                              ny = 280
                          }
                          else if(this.props.data[i].cos_cname.match('訊號與系統')!==null ) {
                              ny = 150
                          }
                          else if(this.props.data[i].cos_cname.match('數值方法')!==null ) {
                              ny = 150
                          }
                          else if(this.props.data[i].cos_cname.match('影像處理概論')!==null ) {
                              ny = 200
                          }
                          else if(this.props.data[i].cos_cname.match('計算機圖學概論')!==null ) {
                              ny = 240
                          }
                          else if(this.props.data[i].cos_cname.match('軟硬體協同設計概論與實作')!==null ) {
                              ny = 320
                          }
                          else if(this.props.data[i].cos_cname.match('計算機概論')!==null ) {
                              ny = 350
                          }
                          else if(this.props.data[i].cos_cname.match('正規語言')!==null ) {
                              ny = 200
                          }
                          else if(this.props.data[i].cos_cname.match('編譯器設計概論')!==null ) {
                              ny = 200
                          }
                          else if(this.props.data[i].cos_cname.match('資料結構')!==null ) {
                              ny = 280
                          }
                          else if(this.props.data[i].cos_cname.match('資訊工程研討')!==null ) {
                              computer += 200
                              ny = computer
                          }
                          else if(this.props.data[i].cos_cname.match('資訊工程專題')!==null ) {
                              ny = 280
                          }
                          else if(this.props.data[i].cos_cname.match('計算機網路概論')!==null ) {
                              ny = 700
                          }
                          else if(this.props.data[i].cos_cname.match('網路通訊原理')!==null ) {
                              ny = 700
                          }
                          else if(this.props.data[i].cos_cname.match('微積分')!==null || this.props.data[i].cos_cname.match('機率')!==null || this.props.data[i].cos_cname.match('線性代數')!==null|| this.props.data[i].cos_cname.match('離散數學')!==null){
                              if(math===0)math=200
                              else math += 40
                              ny = math
                          }
                          else {
                              if(computer===0)computer=350
                              else computer += 100
                              ny = computer
                          }
                      }
                      datai.push({"id":(id).toString(),"label": this.props.data[i].cos_cname,"position":{"x": nx,"y": ny},
                          "size": {
                              "width": 80,
                              "height": 50
                          }})
                      datar.push({"id":(id).toString(),"label": this.props.data[i].cos_cname,pre:this.props.data[i].pre,suggest:this.props.data[i].suggest})
                  }
              } else {
                  if(semflag !== this.props.data[i].semester) {
                      basic = 0
                      math = 0
                      computer=0
                      semflag = this.props.data[i].semester
                      nx += 220
                      if(this.props.data[i].cos_cname.match('物理')!==null || this.props.data[i].cos_cname.match('化學')!==null || this.props.data[i].cos_cname.match('生物')!==null){
                          basic = 50
                          ny = basic
                      }
                      else if(this.props.data[i].cos_cname.match('微積分')!==null || this.props.data[i].cos_cname.match('機率')!==null || this.props.data[i].cos_cname.match('線性代數')!==null|| this.props.data[i].cos_cname.match('離散數學')!==null){
                          math = 200
                          ny = math
                      }
                      else {
                          computer = 350
                          ny = computer
                      }
                  }
                  else{
                      if(this.props.data[i].cos_cname.match('物理')!==null || this.props.data[i].cos_cname.match('化學')!==null || this.props.data[i].cos_cname.match('生物')!==null){
                          if(basic===0)basic=50
                          else basic += 40
                          ny = basic
                      }
                      else if(this.props.data[i].cos_cname.match('微積分')!==null || this.props.data[i].cos_cname.match('機率')!==null || this.props.data[i].cos_cname.match('線性代數')!==null|| this.props.data[i].cos_cname.match('離散數學')!==null){
                          if(math===0)math=200
                          else math += 40
                          ny = math
                      }
                      else {
                          if(computer===0)computer=350
                          else computer += 100
                          ny = computer
                      }
                  }
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
                  for(let j=0;j<i;j++){
                      if(datar[j].label === datar[i].pre){
                          edgepre.push({
                              "source": datar[j].id,
                              "target": datar[i].id
                          })
                      }
                  }
              }
              if(datar[i].suggest !== null){
                  for(let j=0;j<i;j++){
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
      const height = document.body.clientHeight;
      const heightWrap = height;
      return (
      <div>
        <div className="selectFieldStyle animated bounceInRight" style={{display:this.state.slideIndex?'':'none'}} >
            <div>
            <MuiThemeProvider >
                  <SelectField
                      floatingLabelText="選取查看事項"
                      value={this.state.value}
                      onChange={this.handleChange}
                      labelStyle={fontStyle}
                      selectedMenuItemStyle={{color:'#26A69A'}}
                  >
                      <MenuItem style={fontStyle} value={1} primaryText="無" />
                      <MenuItem style={fontStyle} value={2} primaryText="擋修" />
                      <MenuItem style={fontStyle} value={3} primaryText="建議修課" />
                  </SelectField>
              </MuiThemeProvider>
            </div>
            <div>
            <MuiThemeProvider >
                <FlatButton
                    disabled={true}
                    label="已修過"
                    labelStyle={{
                        padding: "5px",
                        height: "45px",
                        verticalAlign: "default",
                        color: "#1d1d1d",
                        fontSize: "1em",
                        fontWeight: "300",
                        letterSpacing: "1px",
                        fontFamily: 'Noto Sans CJK TC',
                    }}
                    icon={<Icon color={"#26A69A"} />}
                />
            </MuiThemeProvider>
            </div>
        </div>
          <Provider store={store}>
        <div className='Map-title-text'>
            <MuiThemeProvider>
            <Tabs
                onChange={this.onChange}
                value={this.state.slideIndex}
                style={{color:"#26A69A"}}
                inkBarStyle={{backgroundColor:"#8b8b8b"}}

            >
                <Tab label="課程" value={0} buttonStyle={fontStyle}/>
                <Tab label="地圖" value={1} buttonStyle={fontStyle}/>
            </Tabs>
            </MuiThemeProvider>
            <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.onChange}
                style={{height:{heightWrap}}}
            >

            <div className='Map-Row'>
              <App studentPasdata={this.props.studentPasdata} data={this.props.data} studentsGrad={this.props.studentsGrad} />
            </div>
            <div>
                <DragAndZoom
                    minZoom={40}
                    maxZoom={150}
                    initialZoom={100}
                    zoomStep={2}
                    onZoom={(zoom, e) => {}}
                >
                    <Graph
                        width={width}
                        height={height}
                        json={this.state.data}
                        onChange={(newGraphJSON) => {}}
                        Node={GitNode}
                        Edge={this.getEdgeColor()}
                    />
                </DragAndZoom>
            </div>
            </SwipeableViews>
        </div>
          </Provider>

      </div>
    )
  }
}

export default Map
