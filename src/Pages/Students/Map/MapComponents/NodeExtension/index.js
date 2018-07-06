import React from 'react';
import {Node,Edge} from 'react-json-graph';
import  './GitNode.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'
import Icon from 'material-ui/svg-icons/maps/directions-walk';
import Arrow from 'react-arrow'



const mapStateToProps = (state, ownProps) => {
    return {
        CourseItem: state.todos
    }
}


class GitnodeItem extends React.Component {
    constructor (props) {
        super(props)
      //console.log(this.props)
    }
    componentWillMount(){
        if(this.state.data[0].pre !== null){
          this.setState({pre:true})
        }
        if(this.state.data[0].suggest !== null ){
          this.setState({suggest:true})
        }
      //console.log(this.state.data)
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        data:nextProps.CourseItem.filter(t=>(t.cosCame === this.props.content))
      })
    }
    state={
        data:this.props.CourseItem.filter(t=>(t.cosCame === this.props.content)),
        pre:false,
        suggest:false
    }

    getarrow = () => {
      if(this.state.data[0].selectvalue === 2){
        if(this.state.pre) {
          return (
            <div style={{marginTop: '15px', float: 'left'}}>
              <Arrow
                direction="right"
                shaftWidth={10}
                shaftLength={0}
                headWidth={10}
                headLength={15}
                fill={'#ff291c'}
                strokeWidth={2}
              />
            </div>
          )
        }
      }
      if(this.state.data[0].selectvalue === 3){
        if(this.state.suggest) {
          return (
            <div style={{marginTop: '15px', float: 'left'}}>
              <Arrow
                direction="right"
                shaftWidth={10}
                shaftLength={0}
                headWidth={10}
                headLength={15}
                fill={'#5144ff'}
                strokeWidth={2}
                onClick={() => {}}
              />
            </div>
          )
        }
      }
      return ''
    }
    render () {
        return(
            <MuiThemeProvider>
                <div>
                  {this.state.data[0].selectvalue === 1?'':this.getarrow()}
                    <FlatButton className="course-btn-map animated pulse"
                                backgroundColor={this.state.data[0].realComplete?"#616161":"#a42926"}
                                hoverColor={"#8d347b"}
                                icon={this.state.data[0].realComplete?<Icon color={"#26A69A"} style={{paddingLeft: 0,}}/>:''}
                                labelStyle={{
                                    padding: "0 5px 0 5px",
                                    height: "45px",
                                    verticalAlign: "default",
                                    color: "#fcfcfc",
                                    fontSize: "1.4em",
                                    fontWeight: "300",
                                    letterSpacing: "1px",
                                    fontFamily: 'Noto Sans CJK TC',
                                }}
                                style={{
                                    paddingRight: 0,
                                    animationDuration:'5s',
                                    animationIterationCount:10000,
                                    borderRadius:'8px'
                                }}
                                label={this.props.content}>

                    </FlatButton>
                </div>
            </MuiThemeProvider>
        )
    }
}


const GitNode = connect(
  mapStateToProps
)(GitnodeItem)

const MapTiltleStyle={
  float:'left',
  verticalAlign: "default",
  fontSize: "2em",
  fontWeight: "700",
  letterSpacing: "1px",
  fontFamily: 'Noto Sans CJK TC',
  width:'120px',
  height:'50px',
  textAlign:'center'

}

export class Gitnode extends Node {
    renderContainer({content, isDragging,onClick}) {
      if(content === "大一 上" || content === "大二 上" || content === "大三 上" || content === "大四 上" || content === "大一 下" || content === "大二 下" || content === "大三 下" || content === "大四 下" ){
        return (
          <div style={MapTiltleStyle}>{content}</div>
        );
      }
      else {
        return (
          <GitNode content={content}/>
        );
      }
    }
}
export class GitEdgePre extends Edge {
    getStyles(source, target) {
        return {
            stroke: '#ff291c',
            strokeDashoffset: '20',
            strokeDasharray:'5',
            strokeOpacity:"0.8",
            animation: 'dash 1000s linear forwards',
        };

    }
}
export class GitEdgeSug extends Edge {
    getStyles(source, target) {
        return {
            stroke: '#5144ff',
            strokeDasharray:'5',
            strokeOpacity:"0.8",
            strokeDashoffset: '20',
            animation: 'dash 1000s linear forwards',};
    }
}

