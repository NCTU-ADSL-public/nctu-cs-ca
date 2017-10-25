import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'animate.css'
import './Course.css';


class TopButton extends React.Component {

    state={
        transition: "background .2s linear",
        width:"50px",
        paddingRight: 0,
        opacity:0.8
    };

    render(){
        return(
            <div className="grad">
                <MuiThemeProvider>
                    <FlatButton
                        className="grad-btn"
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
                        hoverColor={"#80b0d9"}
                        backgroundColor="gray"
                        style={this.state}
                        label={this.props.cosCame}
                        >

                    </FlatButton>
                </MuiThemeProvider>
            </div>

        )
    }
}

export default TopButton