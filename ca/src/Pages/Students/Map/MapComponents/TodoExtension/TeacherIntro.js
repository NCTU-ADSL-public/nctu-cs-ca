import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class TeacherIntro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }
    state={
        open:this.props.opendrawer
    }

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
            </div>
        );
    }
}