import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'react-simple-popover';
import 'animate.css'
import './Course.css';


class Course extends React.Component {

    state={
        open: false,
        style:{
            transition: "background .2s linear",
            width:"200px",
            paddingRight: 0,
            zIndex: "",
        }
    };

    componentWillMount(){
        let tmp;
        tmp = this.props.goard * 200 / 3
        tmp = tmp + "px";
        this.setState({
            width:200,
            paddingRight: 0,
        })
    }

    handleClick(e) {
        this.setState({
            open: !this.state.open,
            style:{
                transition: "background .2s linear",
                width:"200px",
                paddingRight: 0,
                zIndex: !this.state.open?"1000":"",
            }
        });
    }


    handleClose(e) {
        this.setState({
            open: false,
            style:{
                transition: "background .2s linear",
                width:"200px",
                paddingRight: 0,
                zIndex: "",
            }
        });
    }

    render(){
        return(
            <div className={this.props.completed?"grad":this.props.selection?"grad":"grad animated flash"} ref="target">
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
                                            letterSpacing: "1px",
                                            fontFamily: 'Noto Sans CJK TC',
                                        }}
                                        hoverColor={"#80b0d9"}
                                        backgroundColor={this.props.completed?"#3aa276":this.props.selection?"gray":"#d93a64"}
                                        style={this.state.style}
                                        label={this.props.cosCame}
                                        onClick={()=>this.handleClick()}>

                            </FlatButton>
                        </MuiThemeProvider>
                <Popover
                    placement='top'
                    target={this.refs.target}
                    show={this.state.open}
                    onHide={this.handleClose.bind(this)}
                >
                    <div>分數:</div>
                </Popover>
            </div>

        )
    }
}

export default Course