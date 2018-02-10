import React from 'react';
import FadeIn from 'react-fade-in';
import axios from 'axios';
import {ToastContainer, ToastStore} from 'react-toasts';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './Login.css';
import LoginButtom from './LoginButtom.js';
import PopoverExampleAnimation from './popover';

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
            <div className="Login"  >
                <ToastContainer store={ToastStore}/>
                <div id="AjustToggleButtom"> </div>
                <div className="Login-header"   ref="tip">

                    <FadeIn>
                        <div id="rectangle"> </div>
                        <div id="eng-title"><div id="h11">NCTU Curriculum Assistant</div></div>
                        <div id="ch-title"><div id="h22">交大資工線上助理</div></div>

                        <div className = "Login-login">
                            <MuiThemeProvider>
                                <PopoverExampleAnimation />
                            </MuiThemeProvider>
                            <MuiThemeProvider>
                                <LoginButtom />
                            </MuiThemeProvider>
                        </div>

                    </FadeIn>
                </div>
            </div>
        );
      }
}

export default Login;
