import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'animate.css'
import './Course.css';


class GeneralCourse extends React.Component {

    state={
        items:this.props.items,
        style:[{
            transition: "background .2s linear",
            width: "200px",
            paddingRight: 0,

        }
        ]
    };

    componentWillMount(){
        let tmp;
        tmp = this.props.goard * 200 / 3
        tmp = tmp + "px";
        this.setState({
            width:200,
            paddingRight: 0,
        })
    }
    onClick(){
        console.log(this.state.items);
    }
    render(){
        return(
            <div className={this.props.completed?"grad":this.props.selection?"grad":"grad animated flash"}>
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
                            letterSpacing: "1px"
                        }}
                        backgroundColor={this.props.completed?"#3aa276":this.props.selection?"gray":"#d93a64"}
                        style={this.state.style}
                        label={this.props.cosCame}
                        onClick={this.onClick}>

                    </FlatButton>
                </MuiThemeProvider>
            </div>

        )
    }
}

export default GeneralCourse