import React, { Component } from 'react';
import LoginButtom from './LoginButtom.js';
// import ToggleButtom from './ToggleButtom.js';
import './Login.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FadeIn from 'react-fade-in';
import Toggle from 'material-ui/Toggle';
import {grey800, grey200} from 'material-ui/styles/colors';

const styles = {
  toggle: {
    width: '10%',
    marginBottom: 16,
  },
};


class Login extends Component {
  state = {
    block:{
      display:'none',
    },

  };

  getInitialState (){
      return {
      }

  }

  handler(){
    // alert('1');
    // var tipe = this.className.Login-header;
    // alert(tipe.style.background);
    // if(tipe.style.background === "#EEEEEE"){
    //   tipe.style.background=grey800;
    // }
    // else{
    //   tipe.style.background=grey200;
    // }

  };

  render() {
    return (
      <div className="Login" >   


            <div id="AjustToggleButtom"></div>
            <div className="Login-header"   ref="tip">

            <FadeIn>
                <div id="rectangle"></div>
                <div id="eng-title"><h1>NCTU Curriculum Assistant</h1></div>
                <div id="ch-title"><h2>交大資工線上助理</h2></div>

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
