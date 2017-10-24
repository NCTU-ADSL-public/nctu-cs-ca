import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'react-simple-popover';
import 'animate.css'

const style=[{
    transition: "background .2s linear",
    width: "200px",
    paddingRight: 0,

}
];

class GeneralCourse extends React.Component {

    state={
        open: false,
    };

    componentWillMount(){
    }

    handleClick(e) {
        this.setState({open: !this.state.open});
    }


    handleClose(e) {
        this.setState({open: false});
    }

    render(){
        return(
            <div className="grad-popover">
                <Popover
                    placement='bottom'
                    target={this.refs.target}
                    show={this.state.open}
                    onHide={this.handleClose.bind(this)}
                >
                    {this.props.items.map(function(item) {
                        return <li key={item.id}>{item}</li>;
                    })}
                </Popover>
            </div>

        )
    }
}

export default GeneralCourse