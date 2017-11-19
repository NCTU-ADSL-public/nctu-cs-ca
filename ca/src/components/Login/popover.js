import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import {grey50} from 'material-ui/styles/colors';
import './Login.css'
import TabsExampleControlled from './Tabs'

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
                    label="公告"
                    backgroundColor = {"#ae5164"}
                    labelColor = {grey50}
                    className="drawer"
                    labelStyle={{
                        fontFamily: 'Noto Sans CJK TC',
                    }}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{"horizontal":"left","vertical":"top"}}
                    targetOrigin={{"horizontal":"left","vertical":"bottom"}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                    style={{
                        width:'30%',
                        opacity:'0.7',
                        height: '40%'
                    }}
                >
                    <TabsExampleControlled/>
                </Popover>
            </div>
        );
    }
}