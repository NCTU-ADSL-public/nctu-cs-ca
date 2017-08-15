import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';




class RaisedButtonEx extends Component {

    state = {
        style : {
            fontFamily: 'Noto Sans CJK TC',
            fontWeight: 'bold',
        },
        disabled0:false,
        disabled1:false,
        disabled2:false,
        disabled3:false,

    };

    handleclick (index) {
        if(index===0){
            this.setState({disabled0:true});
            this.setState({disabled1:false});
            this.setState({disabled2:false});
            this.setState({disabled3:false});
        }
        else if(index===1){
            this.setState({disabled0:false});
            this.setState({disabled1:true});
            this.setState({disabled2:false});
            this.setState({disabled3:false});

        }

        else if(index===2){
            this.setState({disabled0:false});
            this.setState({disabled1:false});
            this.setState({disabled2:true});
            this.setState({disabled3:false});

        }

        else {
            this.setState({disabled0:false});
            this.setState({disabled1:false});
            this.setState({disabled2:false});
            this.setState({disabled3:true});

        }
    };


    render(){
        return(
            <div>
                <RaisedButton label="全覽" backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={this.state.style} fullWidth={true}
                 disabled={this.state.disabled0}  onTouchTap = { () => this.handleclick(0)}/>
                <br />
                <br />
                <RaisedButton label="必修" backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={this.state.style} fullWidth={true}
                disabled={this.state.disabled1}  onTouchTap = { () => this.handleclick(1)}/>
                <br />
                <br />
                <RaisedButton label="必選修" backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={this.state.style} fullWidth={true}
                disabled={this.state.disabled2}  onTouchTap = { () => this.handleclick(2)}/>
                <br />
                <br />
                <RaisedButton label="建議修課" backgroundColor = "#D3D3D3" labelColor = '#778899' labelStyle={this.state.style} fullWidth={true}
                disabled={this.state.disabled3}  onTouchTap = { () => this.handleclick(3)}/>
            </div>

        );
    };
}

export default RaisedButtonEx;