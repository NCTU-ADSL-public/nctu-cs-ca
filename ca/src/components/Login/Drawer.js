import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey50} from 'material-ui/styles/colors';
import './Login.css'
import axios from 'axios';
import PopoverExampleAnimation from './popover';

let updates=["丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼", "丹尼丹尼", "丹尼丹尼丹尼co c dddddddddddddddddddddddddoc oco co ocsasasasasassssssssssssssssssssss"];
let bug=[""];
export default class DrawerSimpleExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }
    componentWillMount(){
        return axios.get('/bugs').then(loginStatus => {
            // loginStatus.status HTTP response code (e.g., 200, 401)
            //loginStatus.data  object parsed from HTTP response body
            //loginStatus.headers  HTTP presonse headers
            bug=loginStatus.data;

        }).catch(err => {
            console.log(err);
        });
        return axios.get('/updates').then(loginStatus => {
            // loginStatus.status HTTP response code (e.g., 200, 401)
            //loginStatus.data  object parsed from HTTP response body
            //loginStatus.headers  HTTP presonse headers
            updates=loginStatus.data;
        }).catch(err => {
            console.log(err);
        });
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
                        style={{
                            background: '#EEEEEE'
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