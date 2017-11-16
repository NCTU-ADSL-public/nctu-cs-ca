import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import {grey50} from 'material-ui/styles/colors';

export default class PopoverExampleAnimation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div>
                <RaisedButton
                    onClick={this.handleTouchTap}
                    label={this.props.title}
                    fullWidth={true}
                    backgroundColor = {"#ae5164"}
                    labelColor = {grey50}
                    style={{
                        margin:'2px 0 2px 0'
                    }}
                    labelStyle={{
                        fontFamily: 'Noto Sans CJK TC',
                    }}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'center'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                    style={{
                        width:'40%',
                        height: '50%',
                        overflow:'scroll'
                    }}
                >
                        {this.props.data.map(item =>
                            <li style={{ fontFamily: 'Noto Sans CJK TC', margin:"5px 20px", color:'#2E3133'}} >{item}</li>
                        )}
                </Popover>
            </div>
        );
    }
}