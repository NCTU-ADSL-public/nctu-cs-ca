import React from 'react';
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
export default class SendEmail extends React.Component {
    state = {
        open: false,
        studentString: "",
    };

    handleOpen = () => {
        this.setState({open: true});

        {this.props.selectedRow.map((row) => {
            this.state.studentString = this.state.studentString + " " + this.props.students[row].sname + "<3";
        })}
    };

    handleClose = () => {
        this.setState({open: false});
    };

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
                    寄給: {this.state.studentString}
                    <MuiThemeProvider>
                        <TextField/>
                    </MuiThemeProvider>
                </Dialog>
            </div>
        );
    }
}