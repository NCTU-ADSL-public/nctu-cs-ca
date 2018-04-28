import React from 'react';

//for tabs
import 'rc-tabs/assets/index.css'
import '../../../Components/ca-rc-tabs.css'
import Tabs, { TabPane } from 'rc-tabs'
import TabContent from 'rc-tabs/lib/SwipeableTabContent'
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar'

import TeacherList from './TeacherList'
import StudentList from './StudentList'

class Project extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1'
    };
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
          <TabPane tab={`教授狀況`} key='1'>

            <TeacherList />
          </TabPane>
          <TabPane tab={`學生狀況`} key='2'>
            <StudentList />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Project
