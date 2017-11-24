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
                        backgroundColor={this.props.items.length>0?(this.props.items.length===1 && this.props.items[0].reason==='now')?"#AB6BD9":"#3cab7d":"#D95467"}
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
                    placement='top'
                    target={this.refs.target}
                    show={this.state.open}
                    onHide={this.handleClose.bind(this)}
                    style={{width:'auto'}}
                  >
                {this.props.items.map(function(item) {
                    if(item.reason==='now'){
                        return <div><li key={id++}>{item.cn} <div style={{float:'right', color:'#9e48d9'}}>&nbsp;&nbsp;&nbsp;(當期課程)</div></li></div>;
                    }
                    else if(item.reason==='free1' || item.reason==='free2'){
                        return <div><li key={id++}>{item.cn} (抵免課程)<div style={{float:'right', color:'#6A94A2'}}>&nbsp;&nbsp;&nbsp;{item.score}</div></li></div>;
                    }
                    else{
                        return <div><li key={id++}>{item.cn} <div style={{float:'right', color:'green'}}>&nbsp;&nbsp;&nbsp;{item.score}</div></li></div>;
                    }
                    })}
                </Popover>
        </div>

        )
    }
}

export default GeneralCourse