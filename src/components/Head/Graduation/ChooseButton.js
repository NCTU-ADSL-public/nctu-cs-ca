import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class chooseButton extends React.Component{


    render() {
        return (
            <MuiThemeProvider >
                <RaisedButton label="choose">
                </RaisedButton>
            </MuiThemeProvider>
        );
    }

}


export default chooseButton;