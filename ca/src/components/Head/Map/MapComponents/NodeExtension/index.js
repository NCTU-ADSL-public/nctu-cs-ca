import React from 'react';
import {Node,Edge} from 'react-json-graph';
import  './GitNode.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'
import Icon from 'material-ui/svg-icons/maps/directions-walk';


const mapStateToProps = (state, ownProps) => {
    return {
        CourseItem: state.todos
    }
}


class GitnodeItem extends React.Component {
    constructor (props) {
        super(props)
    }
    componentWillMount(){
    }
    componentWillUpdate(nextProps, nextState){
    }
    state={
        data:this.props.info.filter(t=>(t.cosCame === this.props.content))
    }

    render () {
        return(
            <MuiThemeProvider>
                <div>
                    <FlatButton className="course-btn-map animated pulse"
                                backgroundColor="#616161"
                                hoverColor="#338d68"
                                icon={this.state.data[0].realComplete?<Icon color={"#26A69A"}/>:''}
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
                                    background: this.state.data[0].pre_flag ? "#FF2D2D":"",
                                    paddingRight: 0,
                                    animationDuration:'5s',
                                    animationIterationCount:10000
                                }}
                                label={this.props.content}>

                    </FlatButton>
                </div>
            </MuiThemeProvider>
        )
    }
}

export class Gitnode extends Node {
    renderContainer({content, isDragging,onClick}) {
        const className = `container`;

        return (
            <GitnodeItem content={content} info={this.props.CourseItem}/>
        );
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

export const GitNode = connect(
    mapStateToProps
)(Gitnode)
