import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TabsExampleSimple from './courseTag';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './Course.css';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: 'rgba(0, 0, 0, 0)',
        accent1Color: '#00AEAE',
    },
});


class Course extends React.Component{


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <TabsExampleSimple />
            </MuiThemeProvider>
        );
    }

}


export default Course;