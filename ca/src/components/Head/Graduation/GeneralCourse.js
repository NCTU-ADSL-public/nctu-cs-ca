import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'react-simple-popover';
import 'animate.css'
import './Course.css';


class GeneralCourse extends React.Component {

    state={
        open: false,
    };

    componentWillMount(){
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
        let id=0;
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
                            letterSpacing: "1px",
                            fontFamily: 'Noto Sans CJK TC',
                        }}
                        hoverColor={"#80b0d9"}
                        backgroundColor={this.props.completed?"#3aa276":this.props.selection?"gray":"#d93a64"}
                        style={{
                            transition: "background .2s linear",
                            width: "200px",
                            paddingRight: 0,

                        }}
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
                {this.props.items.map(function(item) {
                    return <div><li key={id++}>{item.cn}<div style={{color:(item.score>=60)?'green':'red', float:'right'}}>{item.score}</div> </li></div>;
                })}
                </Popover>
        </div>

        )
    }
}

export default GeneralCourse