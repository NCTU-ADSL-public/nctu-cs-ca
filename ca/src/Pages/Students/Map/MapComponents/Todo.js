import React from 'react'
import './Map.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import './Todo.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import photo from './TodoExtension/defalt.jpg'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';


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

const fontStyle={
    verticalAlign: "default",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    fontFamily: 'Noto Sans CJK TC',
}

class Todo extends React.Component {

    state = {
        open: false,
        opendrawer:false,
        value:0,
        coursedata:[ {'teacher':['彭文志','彭文志','彭文志'],'code':['DCP123', 'DCP456', 'DCP123'],stuLimit:[80], 'stuNum': [56, 77, 22],time:["104-1","104-1","104-1"], 'english': [true, false, false]}]
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
        this.setState({open: false});
    };

    handleChipClick = () => {
        this.setState({opendrawer: true});
    };

    handleChange = (event, index, value)  => {
        this.setState({value:value-1});
    }

    handleCloseDrawer = () => this.setState({opendrawer: false});

    getMenuItem = () => {
        let items=[]
        for (let i = 0; i < this.state.coursedata[0].time.length; i++ ) {
            items.push(
                    <MenuItem style={fontStyle}  value={i+1} key={i} primaryText={`${this.state.coursedata[0].time[i].match('^[0-9]*')}學年度 ${this.state.coursedata[0].time[i].charAt(4)==='1'?'上學期':'下學期'}   ${this.state.coursedata[0].teacher[i]} 教授`} />
                )
        }
        return items

    }

    getinfo = () => {
        return (
            <div>
                <div style={{float:'left'}}>授課教授:&nbsp;&nbsp;&nbsp;
                    <MuiThemeProvider>
                        <Chip
                            onClick={this.handleChipClick}
                            labelStyle={fontStyle}
                            style={{
                                margin: 4,
                                float:'right',
                            }}
                        >
                            <Avatar src={photo}/>
                            {this.state.coursedata[0].teacher[this.state.value]}
                        </Chip>
                    </MuiThemeProvider></div>
                <br/>
                <br/>
                <br/>
                <div style={{clear: 'left'}}>課號: &nbsp;{this.state.coursedata[0].code[this.state.value]}</div>
                <br/>
                <div style={{float:'left'}}>
                    時間:&nbsp;&nbsp;&nbsp;
                    <MuiThemeProvider>
                        <SelectField
                            value={this.state.value+1}
                            onChange={this.handleChange}
                            style={{float:'right', marginTop:'-15px', width:'500px'}}
                            maxHeight={200}
                            labelStyle={fontStyle}
                            selectedMenuItemStyle={{color:'#26A69A'}}
                        >
                            {this.getMenuItem()}
                        </SelectField>
                    </MuiThemeProvider>
                </div>
                <br/>
                <div style={{clear: 'left'}}>學生上限: &nbsp;{this.state.coursedata[0].stuLimit[this.state.value]}</div>
                <br/>
                <div>學生人數: &nbsp;{this.state.coursedata[0].stuNum[this.state.value]}</div>
                <br/>
                <div>英文授課: &nbsp;{this.state.coursedata[0].english[this.state.value]}</div>
                <br/>
                <div>簡介: &nbsp;{this.state.coursedata[0].english[this.state.value]}</div>
                <br/>
                <div>
                </div>
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
                    <MuiThemeProvider>
                        <Drawer
                            docked={false}
                            width={"50%"}
                            open={this.state.opendrawer}
                            onRequestChange={(opendrawer) => this.setState({opendrawer})}
                            openSecondary
                        >
                        </Drawer>
                    </MuiThemeProvider>
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