import React from 'react';
import LoginButtom from './LoginButtom.js';
import './Login.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FadeIn from 'react-fade-in';
import axios from 'axios';
import {ToastContainer, ToastStore} from 'react-toasts';
import DrawerSimpleExample from './Drawer';
import PopoverExampleAnimation from './popover';

let updates=["丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼","丹尼", "丹尼丹尼", "丹尼丹尼丹尼co c dddddddddddddddddddddddddoc oco co ocsasasasasassssssssssssssssssssss"];
let bug=["丹尼","丹尼","丹尼","丹尼","丹尼","丹尼"];

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
        axios.get('/bugs').then(loginStatus => {
            // loginStatus.status HTTP response code (e.g., 200, 401)
            //loginStatus.data  object parsed from HTTP response body
            //loginStatus.headers  HTTP presonse headers
            bug=loginStatus.data;

        }).catch(err => {
            console.log(err);
        });
        axios.get('/updates').then(loginStatus => {
            // loginStatus.status HTTP response code (e.g., 200, 401)
            //loginStatus.data  object parsed from HTTP response body
            //loginStatus.headers  HTTP presonse headers
            updates=loginStatus.data;
        }).catch(err => {
            console.log(err);
        });
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
                    <PopoverExampleAnimation title="待改進項目" bugs={bug} updates={updates}/>
                        </MuiThemeProvider>
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
