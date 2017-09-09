import React, { PropTypes } from 'react'
import './Map.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactHover from 'react-hover';

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0
}
class Todo extends React.Component{


    constructor({ onClick, completed , pre_flag, cosCame ,show_status}){
        super({ onClick, completed , pre_flag, cosCame, show_status});
    }

    state = {
        isMouseover:false,
    }

    handleHover(){
        this.setState({
            isMouseover:!this.state.isMouseover,
        })
    }

    render(){
        return(
            <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger>
                    <div className="course" onMouseOver={this.handleHover()} onMouseDown={this.handleHover()}>
                        <MuiThemeProvider>
                            <FlatButton className="course-btn"
                                        backgroundColor="#616161"
                                        fullWidth="true"
                                        labelStyle={{
                                            color: "#fcfcfc",
                                            fontSize: "1em",
                                            fontWeight: "100",
                                            letterSpacing: "1px"
                                        }}
                                        style={{
                                            overflow:this.state.isMouseover?"visible":"hidden",
                                            visibility:this.props.completed?"hidden":"visible" ,
                                            border: this.props.pre_flag ? "solid 2px #611505":"#616161",
                                        }}
                                        label={this.props.cosCame}
                                        onClick={this.props.onClick}>

                            </FlatButton>
                        </MuiThemeProvider>
                    </div>
                </ReactHover.Trigger>
                <ReactHover.Hover>
                    <h1> I am hover HTML </h1>
                </ReactHover.Hover>
            </ReactHover>
        );
    }
}


Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
}

export default Todo