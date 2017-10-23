import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'react-simple-popover';
import 'animate.css'
import './Course.css';

const style=[{
    transition: "background .2s linear",
    width: "200px",
    paddingRight: 0,

}
];

class GeneralCourse extends React.Component {

    state={
        open: false,
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
        this.setState({open: !this.state.open});
    }


    handleClose(e) {
        this.setState({open: false});
    }

    render(){
        return(
            <div className="grad-popover">
            <div className={this.props.completed?"grad":this.props.selection?"grad":"grad animated flash"} ref="target"
                 onClick={this.handleClick.bind(this)}>
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
                        style={style}
                        label={this.props.cosCame}>

                    </FlatButton>
                </MuiThemeProvider>
            </div>
                <Popover
                    placement='bottom'
                    target={this.refs.target}
                    show={this.state.open}
                    onHide={this.handleClose.bind(this)}
                  >
                <div>{this.props.items}</div>
                </Popover>
        </div>

        )
    }
}

export default GeneralCourse