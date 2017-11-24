import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class infotip extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <MuiThemeProvider>
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            /></MuiThemeProvider>,
            <MuiThemeProvider>
            <FlatButton
                label="Discard"
                primary={true}
                onClick={this.handleClose}
            /></MuiThemeProvider>,
        ];

        return (
            <div>
                <MuiThemeProvider>
                <RaisedButton label="Alert" onClick={this.handleOpen} />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Discard draft?
                    </Dialog></MuiThemeProvider>
            </div>
        );
    }
}