import React from 'react';
//for tabs
import 'rc-tabs/assets/index.css';
import './index.css';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
//
import StudentList from './StudentSearch/StudentList';
import StudentGrad from './StudentGrad/Graduation';

const PanelContent = ({ id }) => (
    <div>{[1, 2, 3, 4].map(item => <p key={item}>{id}</p>)}</div>
);

export default class index extends React.Component {
    state = {
        activeKey: '1',
        start: 0,
    };

    onChange = (activeKey) => {
        this.setState({
            activeKey,
        });
    };

    onTabClick = (key) => {
        if (key === this.state.activeKey) {
            this.setState({
                activeKey: '1',
            });
        }
    };

    tick = () => {
        this.setState({
            start: this.state.start + 10,
        });
    };

    render() {
        const start = this.state.start;
        return (
            <div>
                <Tabs
                    renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick}/>}
                    renderTabContent={() => <TabContent animatedWithMargin />}
                    activeKey={this.state.activeKey}
                    onChange={this.onChange}
                >
                    <TabPane tab={`學生清單`} key="1">
                        <StudentList/>
                    </TabPane>
                    <TabPane tab={`預審狀況`} key="2">
                        <StudentGrad studentName='流川楓' studentId='網多'/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
