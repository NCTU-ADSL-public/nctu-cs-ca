import React, { Component } from 'react';
import LoginButtom from './LoginButtom.js';
import './Login.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FadeIn from 'react-fade-in';
import axios from 'axios';




class Login extends Component {

    constructor(props) {
        super(props);
        this.getLoginstatus();
    }

    getLoginstatus(){
        var _this = this;
        return axios.get('/home/status').then(loginStatus => {
            loginStatus.status // HTTP response code (e.g., 200, 401)
            loginStatus.data // object parsed from HTTP response body
            loginStatus.headers // HTTP presonse headers
            _this.loginStatusHandler(loginStatus.data.state);
            console.log(loginStatus.data);
        }).catch(err => {
            console.log(err);
        });
    }

    loginStatusHandler(index){
        if(index === "0"){
            this.setState({
                LoginMessage_state1: {
                    display:'none',
                },
                LoginMessage_state2:{
                    display:'none',
                }
            })
        }

        else if(index === "1"){
            this.setState({
                LoginMessage_state1: {
                    display:'inline',
                },
                LoginMessage_state2:{
                    display:'none',
                }
            })
        }
        else if(index === "2"){
            this.setState({
                LoginMessage_state1: {
                    display:'none',
                },
                LoginMessage_state2:{
                    display:'inline',
                }
            })
        }
    }

    state = {
        LoginMessage_state1:{
            display:'none',
        },
        LoginMessage_state2:{
            display:'none',
        }
    };

      render() {
        return (
          <div className="Login" >

              <div style = {this.state.LoginMessage_state1}>Oops you are not cs student !(status 1)</div>
              <br/>
              <div style = {this.state.LoginMessage_state2}>Please login first(status 2)</div>
                <div id="AjustToggleButtom"></div>
                <div className="Login-header"   ref="tip">

                <FadeIn>
                    <div id="rectangle"></div>
                    <div id="eng-title"><div id="h11">NCTU Curriculum Assistant</div></div>
                    <div id="ch-title"><div id="h22">交大資工線上助理</div></div>

                    <div className = "Login-login">
                      <MuiThemeProvider>
                        <LoginButtom />
                      </MuiThemeProvider>
                    </div>

                </FadeIn>
                </div>



                <footer>Copyright @2017 NCTUCS 交通大學資訊工程學系</footer>
          </div>
        );
      }
}

export default Login;
