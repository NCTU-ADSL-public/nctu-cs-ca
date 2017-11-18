import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey50} from 'material-ui/styles/colors';
import './Login.css'
import axios from 'axios';
import PopoverExampleAnimation from './popover';

let updates=["丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼", "丹尼丹尼", "丹尼丹尼丹尼co c dddddddddddddddddddddddddoc oco co ocsasasasasassssssssssssssssssssss"];
let bug=["丹尼","丹尼","丹尼","丹尼","丹尼","丹尼"];
export default class DrawerSimpleExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }
    componentWillMount(){

    }
    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <RaisedButton
                        label="公告"
                        backgroundColor = {"#bb5976"}
                        labelColor = {grey50}
                        className="drawer"
                        labelStyle={{
                            fontFamily: 'Noto Sans CJK TC',
                        }}
                        onClick={this.handleToggle}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                        className="drawerIn"
                        style={{
                            opacity:'0%',
                            backgroundColor: '#ee215e',
                            height:'50%'
                        }}
                    >
                        <PopoverExampleAnimation title="待改進項目" data={bug}/>
                        <PopoverExampleAnimation title="已更新項目" data={updates}/>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        );
    }
}