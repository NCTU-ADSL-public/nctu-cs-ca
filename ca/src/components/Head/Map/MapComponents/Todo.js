import React from 'react'
import './Map.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactHover from 'react-hover';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import './Todo.css';

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: -15
};


const customContentStyle = {
    maxWidth: 'none',
    maxHeight: 'none',
};

const bodyStyle = {
    fontFamily: 'Noto Sans CJK TC',
};
const titleStyle = {
    fontFamily: 'Noto Sans CJK TC',
    color:'#565656'
};

class Todo extends React.Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render(){
        const actions = [
            <FlatButton
                label="Exit"
                primary={true}
                style={{
                    fontFamily: 'Noto Sans CJK TC',
                    color: '#7B7B7B'
                }}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        return(
            <div className="course"
                 style={{
                     transition: 'all .2s ease',
                     opacity: !this.props.completed ? "1" : "0.2",
                 }}>
                <ReactHover
                    options={optionsCursorTrueWithMargin}>
                    <ReactHover.Trigger>
                        <MuiThemeProvider>
                            <FlatButton className="course-btn"
                                        backgroundColor={"#616161"}
                                        hoverColor={"#338d68"}
                                        fullWidth={true}
                                        labelStyle={{
                                            padding: "5px",
                                            height: "45px",
                                            verticalAlign: "default",
                                            color: "#fcfcfc",
                                            fontSize: "1em",
                                            fontWeight: "300",
                                            letterSpacing: "1px",
                                            fontFamily: 'Noto Sans CJK TC',
                                        }}
                                        style={{
                                            background: this.props.pre_flag ? "#FF2D2D":"",
                                            paddingRight: 0,
                                        }}
                                        label={this.props.cosCame}
                                        onClick={this.handleOpen}

                            >

                            </FlatButton>
                        </MuiThemeProvider>
                    </ReactHover.Trigger>
                    <ReactHover.Hover>
                        <div className="hover-info">{this.props.cosCame}</div>
                    </ReactHover.Hover>
                </ReactHover>
                <MuiThemeProvider>
                <Dialog
                    title={this.props.cosCame}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    contentStyle={customContentStyle}
                    bodyStyle={bodyStyle}
                    titleStyle={titleStyle}
                    onRequestClose={this.handleClose}
                >

                </Dialog>
                </MuiThemeProvider>
            </div>

        )
    }
}


Todo.PropTypes = {
    onClick: PropTypes.func.isRequired,
    pre_flag: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
};

export default Todo