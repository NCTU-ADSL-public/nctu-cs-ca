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
import StudentInform from './StudentInform/StudentSelList';

import LoadingComponent from '../Loading';



export default class index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeKey: '1',
            start: 0,
            initStudents: [
                {
                    student_id: '0316099',
                    sname: '資料錯誤',
                    program: '網多',
                    graduate: "0",
                    graduate_submit: "0",
                },
                {
                    student_id: '0316030',
                    sname: '余治杰',
                    program: '資工B',
                    graduate: "0",
                    graduate_submit: "1",
                },
                {
                    student_id: '0316031',
                    sname: '王冠升',
                    program: '資工B',
                    graduate: "1",
                    graduate_submit: "1",
                },
                {
                    student_id: '0316132',
                    sname: '郭毓梁',
                    program: '資工A',
                    graduate: "0",
                    graduate_submit: "1",
                },
                {
                    student_id: '0316033',
                    sname: '趙賀笙',
                    program: '資工A',
                    graduate: "1",
                    graduate_submit: "2",
                },
                {
                    student_id: '0316034',
                    sname: '王于哲',
                    program: '資工B',
                    graduate: "0",
                    graduate_submit: "2",
                },
                {
                    student_id: '0316235',
                    sname: '陳奕安',
                    program: '資工B',
                    graduate: "0",
                    graduate_submit: "0",
                },
                {
                    student_id: '0316036',
                    sname: '陳冠廷',
                    program: '網多',
                    graduate: "1",
                    graduate_submit: "0",
                },
                {
                    student_id: '0316037',
                    sname: '郭蕎',
                    program: '資電',
                    graduate: "0",
                    graduate_submit: "0",
                },

            ],
            loading: true,
        };
    }

    componentDidMount(){
        const self = this;
        axios.get('/assistants/graduate/list').then(studentData => {
            self.setState({
                initStudents: studentData.data,
                loading: false,
            });
        }).catch(err => {
            console.log(err);
        });
    }

    onChange = (activeKey) => {
        this.setState({
            activeKey,
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

                            <StudentList students={this.state.initStudents}/>
                        </TabPane>
                        <TabPane tab={`預審通知`} key="2">
                            <StudentInform
                                students={this.state.initStudents}
                                idCard={this.props.idCard}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            );
    }
}