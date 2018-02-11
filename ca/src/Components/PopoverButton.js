import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'react-simple-popover';
import 'animate.css'

const style = {
    Button: {
        transition: "background .2s linear",
        width: "200px",
        paddingRight: 0,
        overflow: 'visible',
        borderRadius: 2,
    },
    ButtonLabel: {
        padding: "5px",
        height: "45px",
        verticalAlign: "default",
        color: "#fcfcfc",
        fontSize: "1em",
        fontWeight: "300",
        letterSpacing: "1px",
        fontFamily: 'Noto Sans CJK TC',
    },
    ButtonBox: {
        margin: '0 1px 6px 1px',
        float: 'left',
        height: 32
    },
    Popover: {
        zIndex: 1000
    }
}

class PopoverButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
        }
    }

    setIsOpened = (isOpened) => {
        this.setState({isOpened: isOpened});
    }

    render(){
        const {label, flash, backgroundColor, children} = this.props

        return(
            <div style={style.Popover}>
                <div className={flash ? 'animated flash' : ''}
                     onClick={() => this.setIsOpened(!this.state.isOpened)}
                     style={style.ButtonBox}
                     ref="target"
                >
                    <MuiThemeProvider>
                        <FlatButton
                            className="grad-btn"
                            labelStyle={style.ButtonLabel}
                            hoverColor={"#80b0d9"}
                            backgroundColor={backgroundColor ? backgroundColor : '#616161'}
                            style={style.Button}
                            label={label}
                        />
                    </MuiThemeProvider>
                </div>
                <Popover
                    placement='top'
                    target={this.refs.target}
                    show={this.state.isOpened}
                    onHide={() => this.setIsOpened(false)}
                >
                    {children}
                </Popover>
            </div>

        )
    }
}

export default PopoverButton