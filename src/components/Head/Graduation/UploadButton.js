import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Credit extends React.Component{


    render() {
        return (
            <MuiThemeProvider >
                <RaisedButton label="upload">
                </RaisedButton>
            </MuiThemeProvider>
        );
    }

}


export default Credit;