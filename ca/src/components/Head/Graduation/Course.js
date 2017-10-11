import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactHover from 'react-hover';
import 'animate.css'
import './Course.css';


const CourseButtonStyle = {
    transition: "background .2s linear",
    width:"200px",
    paddingRight: 0,
};

class Course extends React.Component {

    state={
        transition: "background .2s linear",
        width:"200px",
        paddingRight: 0,
    };

    componentWillMount(){
        let tmp;
        tmp = this.props.goard * 200 / 3
        tmp = tmp + "px";
        this.setState({
            width:tmp,
            paddingRight: 0,
        })
    }

    render(){
        return(
            <div className={this.props.completed?"grad":this.props.selection?"grad":"grad animated flash"}>
                        <MuiThemeProvider>
                            <FlatButton
                                        className="grad-btn"
                                        labelStyle={{
                                            padding: "5px",
                                            height: "45px",
                                            verticalAlign: "default",
                                            color: "#fcfcfc",
                                            fontSize: "1em",
                                            fontWeight: "300",
                                            letterSpacing: "1px"
                                        }}
                                        backgroundColor={this.props.completed?"#3aa276":this.props.selection?"gray":"#d93a64"}
                                        style={this.state}
                                        label={this.props.cosCame}
                                        onClick={this.props.onClick}>

                            </FlatButton>
                        </MuiThemeProvider>
            </div>

        )
    }
}

export default Course