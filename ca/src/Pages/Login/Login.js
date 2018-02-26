import React from 'react';
import FadeIn from 'react-fade-in';
import axios from 'axios';
import {Grid, Col, Row} from 'react-bootstrap'
import {ToastContainer, ToastStore} from 'react-toasts';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import './Login.css';
import PopoverExampleAnimation from './popover';
import {grey50} from "material-ui/styles/colors";


class Login extends React.Component {

    getLoginstatus(){
        let _this = this;
        return axios.get('/user/state').then(loginStatus => {
            // loginStatus.status HTTP response code (e.g., 200, 401)
            //loginStatus.data  object parsed from HTTP response body
            //loginStatus.headers  HTTP presonse headers
            _this.loginStatusHandler(loginStatus.data.state);
        }).catch(err => {
            console.log(err);
        });
    }

    loginStatusHandler(index){
        this.setState({
             LoginMessage_state:index,
        })
    }

    state = {
        LoginMessage_state:"0",
    };

    componentWillMount(){
        this.getLoginstatus();
    }
    componentDidMount() {
        if (this.state.LoginMessage_state === "1")
            ToastStore.error("Oops you are not cs student !");
        else if(this.state.LoginMessage_state === "2")
            ToastStore.error("Please login first")
    }

    render() {
        return (
            <div className="full-page">
                <ToastContainer store={ToastStore}/>
                <Grid>
                    <FadeIn>
                        <Row>
                            <div className="Login-header" ref="tip">
                                    <div id="eng-title">NCTU Curriculum Assistant</div>
                                    <div id="ch-title">交大資工線上助理</div>
                            </div>
                        </Row>
                        <Row>
                            <div className = "Login-login">
                                <MuiThemeProvider>
                                    <PopoverExampleAnimation />
                                </MuiThemeProvider>
                                <MuiThemeProvider>
                                    <RaisedButton label='Login'
                                                  backgroundColor='#00AEAE'
                                                  labelColor={grey50}
                                                  href='/auth/Nctu'
                                                  style={{width: '20%', verticalAlign: 'top'}}
                                    />
                                </MuiThemeProvider>
                            </div>
                        </Row>
                    </FadeIn>
                </Grid>
            </div>
        );
      }
}

export default Login;
