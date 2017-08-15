import React, { Component } from 'react';
import LoginButtom from './LoginButtom.js';
import './Login.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FadeIn from 'react-fade-in';




class Login extends Component {


  render() {
    return (
      <div className="Login" >   


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
