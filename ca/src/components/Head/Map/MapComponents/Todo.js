import React from 'react'
import './Map.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import './Todo.css';
import axios from 'axios';


const customContentStyle = {
    maxWidth: 'none',
    maxHeight: 'none',
};

const bodyStyle = {
    fontFamily: 'Noto Sans CJK TC',
};
const titleStyle = {
    fontFamily: 'Noto Sans CJK TC',
    color:'#565656'
};

class Todo extends React.Component {

    state = {
        open: false,
        coursedata:[ {'teacher':'彭文志','code':['DCP123', 'DCP456', 'DCP123'], 'stuNum': [56, 77, 22], 'english': [true, false, false]}]
    };

    handleOpen = () => {
        let _this = this
        axios.post('/students/courseMap/courseInfo', {
            cos_cname:_this.props.cosCame
        })
            .then(res => {
                console.log(res.data)
                this.setState({coursedata: res.data});
            })
            .catch(err => {
                //window.location.replace("/logout ");
                console.log(err)
            });
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    getinfo = () => {
        return (
            <div>
                <div>授課教授: {this.state.coursedata[0].teacher}</div>
                <br/>
                <div>課號: {this.state.coursedata[0].code[0]}</div>
                <br/>
                <div>學生人數: {this.state.coursedata[0].stuNum[0]}</div>
                <br/>
                <div>英文授課: {this.state.coursedata[0].english[0]}</div>
                <br/>
            </div>
        )
    }

    render(){
        const actions = [
            <FlatButton
                label="Exit"
                primary={true}
                style={{
                    fontFamily: 'Noto Sans CJK TC',
                    color: '#7B7B7B'
                }}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        return(
            <div className="course"
                 style={{
                     transition: 'all .2s',
                     opacity: !this.props.completed ? "1" : "0.2",
                 }}>
                 <MuiThemeProvider>
                     <FlatButton className="course-btn"
                          backgroundColor={"#616161"}
                          hoverColor={"#338d68"}
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
                          onClick={this.handleOpen}
                     />
                 </MuiThemeProvider>
                <MuiThemeProvider>
                <Dialog
                    title={this.props.cosCame}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    contentStyle={customContentStyle}
                    bodyStyle={bodyStyle}
                    titleStyle={titleStyle}
                    onRequestClose={this.handleClose}
                >
                    {this.state.coursedata===null?'':this.getinfo()}
                </Dialog>
                </MuiThemeProvider>
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