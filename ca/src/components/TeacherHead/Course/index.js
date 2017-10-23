import React from 'react';
//for tabs
import 'rc-tabs/assets/index.css';
import './index.css';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
//
import CourseList from './CourseSearch/CourseList';
//import StudentGrad from './StudentGrad/Graduation';


const initItem = [
    {
        id: 'dcp9999',
        sem: '105下',
        name: '資料庫系統概論',
        avgScore: '81.5',
        pAvgScore: '87.8',
    },
    {
        id: 'dcp9998',
        sem: '105上',
        name: '計算機網路概論',
        avgScore: '87.87',
        pAvgScore: '94.87',
    },

];


export default class index extends React.Component {

    state = {
        activeKey: '1',
        start: 0,
        //for passing student selected by studentList
        itemId: '6666',
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

    searchCallback = (item) => {
        alert(item.name);
        this.setState({
            activeKey: '2',
            studentName: item.name,
        });
    };

    render() {
        return (
            <div>
                <Tabs
                    renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick}/>}
                    renderTabContent={() => <TabContent/>}
                    activeKey={this.state.activeKey}
                    onChange={this.onChange}
                >
                    <TabPane tab={`課程清單`} key="1">
                        <CourseList items={initItem} parentFunction={this.searchCallback}/>
                    </TabPane>
                    <TabPane tab={`詳細資訊`} key="2">

                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
