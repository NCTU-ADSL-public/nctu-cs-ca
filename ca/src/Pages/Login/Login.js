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
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
          for(let i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
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
                            <Col xs={11} xsOffset={1} sm={12} smOffset={0}>
                                <div className="Login-header" ref="tip">
                                    <div id="eng-title">NCTU Curriculum Assistant</div>
                                    <div id="ch-title">交大資工線上助理</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="Login-buttons">
                                <Col xs={12} sm={7} smOffset={5}>
                                    <MuiThemeProvider>
                                        <PopoverExampleAnimation />
                                    </MuiThemeProvider>
                                    <MuiThemeProvider>
                                        <RaisedButton label='Login'
                                                      backgroundColor='#00AEAE'
                                                      labelColor={grey50}
                                                      href='/auth/Nctu'
                                                      className='login-btn'
                                        />
                                    </MuiThemeProvider>
                                </Col>
                            </div>
                        </Row>
                    </FadeIn>
                </Grid>
            </div>
        );
      }
}

export default Login;
