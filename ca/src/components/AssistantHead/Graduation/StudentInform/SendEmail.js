import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from './TextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
const styles = {
    title:{
        padding: '3px 3px 0px 3px',
    },
    items:{
        padding: '5px 0 7px 20px',
    },
    item:{
        display: 'inline-block',
        height: '15px',
        width: 'auto',
        padding: '3px',
        color: '#979797',
        size: '8px',
    },
};

export default class SendEmail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            studentList: [],
        };
        this.studentDataMatch = this.studentDataMatch.bind(this);
    }

    handleOpen = () => {
        this.setState({open: true});
        this.studentDataMatch();
    };


    handleClose = () => {
        this.setState({open: false});
    };

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

    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="送出"
                primary={true}
                keyboardFocused={false}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="寄信通知" onClick={this.handleOpen} />
                <Dialog
                    title="寄信通知"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div style={styles.title}>寄件人:</div>
                    <div style={styles.items}>
                        <div style={styles.item}>{this.props.idCard.name}</div>
                    </div>
                    <div style={styles.title}>密件副本:</div>
                    <div style={styles.items}>
                    {this.state.studentList.map( (item, i) => (
                        <div key={i} style={styles.item}>{item.studentId} {item.studentName} {item.studentEmail},</div>
                    ))}
                    </div>
                    <MuiThemeProvider>
                        <TextField/>
                    </MuiThemeProvider>
                </Dialog>
            </div>
        );
    }
}