import React from 'react';
import axios from 'axios';
//for tabs
import 'rc-tabs/assets/index.css';
import './index.css';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
//
import StudentList from './StudentSearch/StudentList';
import StudentGrad from './StudentGrad/Graduation';


let initStudents = [
    {
        student_id: '0316000',
        sname: '流川楓',
        program: '網多',
        graduate: 0,
    },
    {
        student_id: '0316030',
        sname: '余治杰',
        program: '資工B',
        graduate: 0,
    },
    {
        student_id: '0316031',
        sname: '王冠升',
        program: '資工B',
        graduate: 1,
    },
    {
        student_id: '0316132',
        sname: '郭毓梁',
        program: '資工A',
        graduate: 0,
    },
    {
        student_id: '0316033',
        sname: '趙賀笙',
        program: '資工A',
        graduate: 1,
    },
    {
        student_id: '0316034',
        sname: '王于哲',
        program: '資工B',
        graduate: 0,
    },
    {
        student_id: '0316235',
        sname: '陳奕安',
        program: '資工B',
        graduate: 0,
    },
    {
        student_id: '0316036',
        sname: '陳冠廷',
        program: '網多',
        graduate: 1,
    },
    {
        student_id: '0316037',
        sname: '郭蕎',
        program: '資電',
        graduate: 0,
    },

];



export default class index extends React.Component {

    componentWillMount(){
        console.log(initStudents);
        axios.get('/assistants/graduate/list').then(studentData => {
            initStudents = studentData.data;
        }).catch(err => {
            console.log(err);
        });
    }

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
            studentName: student.sname,
            studentId: student.program,
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
