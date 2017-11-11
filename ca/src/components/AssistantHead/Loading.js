import React from 'react';
//MuiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

export default class Loading extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <RefreshIndicator
                    size={100}
                    left={100}
                    top={100}
                    loadingColor="#00AEAE"
                    status="loading"
                    style={style.refresh}
                />
            </MuiThemeProvider>
        );
    }
}
