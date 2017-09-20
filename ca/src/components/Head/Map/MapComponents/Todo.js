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
    shiftY: 0
};

class Todo extends React.Component {

    render(){
        return(
            <div className="course"
                 style={{
                     opacity: !this.props.completed ? "1" : "0.1",
                 }}>
                <ReactHover
                    options={optionsCursorTrueWithMargin}>
                    <ReactHover.Trigger>
                        <MuiThemeProvider>
                            <FlatButton className="course-btn"
                                        backgroundColor="#616161"
                                        fullWidth="true"
                                        labelStyle={{
                                            padding: "5px",
                                            height: "45px",
                                            verticalAlign: "default",
                                            color: "#fcfcfc",
                                            fontSize: "1em",
                                            fontWeight: "300",
                                            letterSpacing: "1px"
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


// Todo.PropTypes = {
//     onClick: PropTypes.func.isRequired,
//     pre_flag: PropTypes.bool.isRequired,
//     completed: PropTypes.number.isRequired,
//     cos_cname: PropTypes.string.isRequired
// };

export default Todo