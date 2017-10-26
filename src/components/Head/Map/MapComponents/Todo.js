import React from 'react'
import './Map.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactHover from 'react-hover';
import PropTypes from 'prop-types';
import './Todo.css';

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: -15
};

class Todo extends React.Component {

    state={
        hoverColor:this.props.pre_flag ?"#FF2D2D" :"#338d68",
        backgroundColor:this.props.active ?"#338d68" :"#616161"
    };


    render(){
        return(
            <div className="course"
                 style={{
                     transition: "opacity .2s linear",
                     opacity: !this.props.completed ? "1" : "0.2",
                 }}>
                <ReactHover
                    options={optionsCursorTrueWithMargin}>
                    <ReactHover.Trigger>
                        <MuiThemeProvider>
                            <FlatButton className="course-btn"
                                        backgroundColor={this.state.backgroundColor}
                                        hoverColor={this.state.hoverColor}
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
                                        }}
                                        label={this.props.cosCame}
                                        onClick={this.props.onClick}>

                            </FlatButton>
                        </MuiThemeProvider>
                    </ReactHover.Trigger>
                    <ReactHover.Hover>
                        <div className="hover-info">{this.props.cosCame}</div>
                    </ReactHover.Hover>
                </ReactHover>
            </div>

        )
    }
}


Todo.PropTypes = {
    onClick: PropTypes.func.isRequired,
    pre_flag: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
};

export default Todo