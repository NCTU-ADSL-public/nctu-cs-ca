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


const initStudents = [
    {
        name: '流川楓',
        group: '網多',
        graduated: '可畢業',
    },
    {
        name: '余治杰',
        group: '資工B',
        graduated: '未畢業',
    },
    {
        name: '王冠升',
        group: '資工B',
        graduated: '未畢業',
    },
    {
        name: '郭毓梁',
        group: '資工A',
        graduated: '未畢業',
    },
    {
        name: '趙賀笙',
        group: '資工A',
        graduated: '未畢業',
    },
    {
        name: '王于哲',
        group: '資工B',
        graduated: '未畢業',
    },
    {
        name: '陳奕安',
        group: '資工B',
        graduated: '未畢業',
    },
    {
        name: '陳冠廷',
        group: '網多',
        graduated: '可畢業',
    },
    {
        name: '郭蕎',
        group: '資電',
        graduated: '可畢業',
    },
    {
        name: '趙賀笙',
        group: '資工A',
        graduated: '未畢業',
    },
    {
        name: '趙賀笙',
        group: '資工A',
        graduated: '未畢業',
    },
    {
        name: '趙賀笙',
        group: '資工A',
        graduated: '未畢業',
    },
    {
        name: '趙賀笙',
        group: '資工A',
        graduated: '未畢業',
    },
    {
        name: '趙賀笙',
        group: '資工A',
        graduated: '未畢業',
    },
    {
        name: '趙賀笙',
        group: '資工A',
        graduated: '未畢業',
    },

];
    


export default class index extends React.Component {

    state = {
        activeKey: '1',
        start: 0,
        //for passing student selected by studentList
        studentName: '流川楓',
        studentId: '網多',
    };

    onChange = (activeKey) => {
        this.setState({
            activeKey,
        });
    };

    onTabClick = (key) => {
        /*if (key === this.state.activeKey) {
            this.setState({
                activeKey: key,
            });
        }*/
    };

    searchCallback = (student) => {
        this.setState({
            activeKey: '2',
            studentName: student.name,
            studentId: student.group,
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
                    <TabPane tab={`學生清單`} key="1">
                        <StudentList students={initStudents} parentFunction={this.searchCallback}/>
                    </TabPane>
                    <TabPane tab={`預審狀況`} key="2">
                        <StudentGrad studentName={this.state.studentName} studentId={this.state.studentId}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
