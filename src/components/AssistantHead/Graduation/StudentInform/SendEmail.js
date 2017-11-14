import React from 'react';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
const styles = {
    titleSender:{
        fontFamily: 'Noto Sans CJK TC',
        padding: '3px 3px 5px 3px',
    },
    title:{
        fontFamily: 'Noto Sans CJK TC',
        padding: '3px 3px 0px 3px',
    },
    items:{
        padding: '2px 0 3px 20px',
    },
    item:{
        display: 'inline-block',
        height: '10px',
        width: 'auto',
        padding: '2px',
        color: '#979797',
        fontSize: '8px',
    },
    itemsReceiver:{
        padding: '5px 0 7px 20px',
        maxHeight: 50,
        overflow: 'auto',
    },
    labelStyle: {
        fontFamily: 'Noto Sans CJK TC',
        color: '#434343'
    },
    text1:{
        width: '90%',
        padding: '5px',
        fontFamily: 'Noto Sans CJK TC',
    },
    text2:{
        width: '90%',
        padding: '5px',
        fontSize: '12px',
        fontFamily: 'Noto Sans CJK TC',
    },
};

export default class SendEmail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            loginOpen: false,
            studentList: [],
            title: '',
            content: '',
            account: '',
            password: '',
            login: '',
        };
        this.studentDataMatch = this.studentDataMatch.bind(this);
    }

    handleOpen = () => {
        this.setState({open: true});
        this.studentDataMatch();
    };


    handleClose = () => {
        this.setState({
            open: false,
            loginOpen: false,
            title: '',
            content: '',
        });
    };

    handleSend = () => {
        this.setState({loginOpen: true});
    };

    handleLoginClose = () => {
        this.setState({loginOpen: false});
    };

    handleLogin = () => {
        axios.post('/assistants/mail/login', {
            account: this.state.account,
            password: this.state.password,
        }).then(res => {
            console.log(res);
            if(res.login)
                this.loginSendSuccess();
            else
                this.setState({login: '登入失敗!'});
        }).catch(err => {
            console.log(err);
            this.setState({login: '登入失敗!'});
        });
    };

    loginSendSuccess(){
        this.setState({
            open: false,
            loginOpen: false,
            title: '',
            content: '',
        });
        let recipients = this.state.studentList
            .map( (item, i) => item.studentId );


        axios.post('/assistants/mail', {
            title: this.state.title,
            recipients: recipients,
            message: this.state.content,
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });

        console.log('Send out:');
        console.log(recipients);
        console.log(this.state.title);
        console.log(this.state.content);
        console.log(this.state.account);
    }

    studentDataMatch(){
        let newList = [];
        this.props.initStudents
            .sort((a, b) => (parseInt(a.student_id) - parseInt(b.student_id)))
            .forEach( (item) => {
                if(item.selected){
                    newList.push({
                        studentId: item.student_id,
                        studentName: item.sname,
                        studentEmail: item.email,
                    });
                }
                return 1;
            });
        this.setState({studentList: newList});
    }

    handleChangeTitle = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    handleChangeContent = (event) => {
        this.setState({
            content: event.target.value,
        });
    };

    handleChangeAccount = (event) => {
        this.setState({
            account: event.target.value,
        });
    };

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.handleClose}
                labelStyle={styles.labelStyle}
            />,
            <FlatButton
                label="送出"
                primary={true}
                keyboardFocused={false}
                onClick={this.handleSend}
                labelStyle={styles.labelStyle}
            />,
        ];

        const actionsLogin = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleLoginClose}
                labelStyle={styles.labelStyle}
            />,
            <FlatButton
                label="Login"
                primary={true}
                keyboardFocused={false}
                onClick={this.handleLogin}
                labelStyle={styles.labelStyle}
            />,
        ];


        return (
            <div>
                <RaisedButton label="寄信通知"
                              onClick={this.handleOpen}
                              labelStyle={styles.labelStyle}/>
                <Dialog
                    title="登入助理信箱"
                    actions={actionsLogin}
                    modal={false}
                    open={this.state.loginOpen}
                    style={{zIndex: '11',}}
                    titleStyle={styles.labelStyle}
                >
                    <div style={{color: '#cc4b61'}}>{this.state.login}</div>
                    <MuiThemeProvider>
                        <TextField
                            floatingLabelText="帳號"
                            style={styles.text1}
                            value={this.state.account}
                            onChange={this.handleChangeAccount}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <TextField
                            floatingLabelText="密碼"
                            type="password"
                            style={styles.text1}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                        />
                    </MuiThemeProvider>
                </Dialog>

                <Dialog
                    title="寄信通知"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    style={{zIndex: '10',}}
                    titleStyle={styles.labelStyle}
                >
                        <div style={styles.titleSender}>寄件人: {this.props.idCard.name}</div>
                        <div style={styles.title}>密件副本:</div>
                        <div style={styles.itemsReceiver}>
                        {this.state.studentList.map( (item, i) => (
                            <div key={i} style={styles.item}>{item.studentId} {item.studentName},</div>
                        ))}
                        </div>
                        <MuiThemeProvider>
                            <TextField
                                hintText="【助理通知】同學快送審哦"
                                floatingLabelText="主旨"
                                style={styles.text1}
                                value={this.state.title}
                                onChange={this.handleChangeTitle}
                            />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <TextField
                                hintText="同學快送審!"
                                floatingLabelText="內文"
                                multiLine={true}
                                rows={3}
                                rowsMax={6}
                                style={styles.text2}
                                value={this.state.content}
                                onChange={this.handleChangeContent}
                            />
                        </MuiThemeProvider>
                </Dialog>


            </div>
        );
    }
}