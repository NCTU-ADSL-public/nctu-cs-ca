import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

export default class TabsExampleControlled extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                inkBarStyle={{color:'blue'}}
            >
                <Tab label="待改進項目" value="a"
                     buttonStyle = {{backgroundColor: "#ae5164", fontFamily: 'Noto Sans CJK TC',}}>
                    <div>
                        <p>
                            {this.props.bugs.map(item =>
                                <li style={{ fontFamily: 'Noto Sans CJK TC', margin:"5px 20px", color:'#2E3133'}} >{item}</li>
                            )}
                        </p>
                    </div>
                </Tab>
                <Tab label="已更新項目" value="b"
                     buttonStyle = {{backgroundColor: "#ae5164", fontFamily: 'Noto Sans CJK TC',}}>
                    <div>
                        <p>
                            {this.props.updates.map(item =>
                                <li style={{ fontFamily: 'Noto Sans CJK TC', margin:"5px 20px", color:'#2E3133'}} >{item}</li>
                            )}
                        </p>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}