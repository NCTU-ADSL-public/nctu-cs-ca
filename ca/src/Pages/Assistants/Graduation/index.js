import React from 'react';
import axios from 'axios';
//for tabs
import 'rc-tabs/assets/index.css';
import '../../../Components/ca-rc-tabs.css';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
//
import StudentList from './StudentSearch/StudentList';
import StudentInform from './StudentInform/StudentSelList';

import FakeData from '../../../Resources/FakeData'

import { connect } from 'react-redux'

class index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeKey: '1',
            start: 0,
            initStudents: FakeData.StudentList,
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

const mapState = (state)=>({
    idCard: state.Assistant.User.idCard
})

export default connect(mapState)(index)