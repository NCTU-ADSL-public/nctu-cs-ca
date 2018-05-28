import React from 'react'

import GroupList from './GroupList'
import GroupApply from './GroupApply'

// for tabs
import 'rc-tabs/assets/index.css'
import '../../../Components/ca-rc-tabs.css'
import Tabs, { TabPane } from 'rc-tabs'
import TabContent from 'rc-tabs/lib/SwipeableTabContent'
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar'

class Group extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeKey: '1',
      start: 0
    }
  }
  onChange = (activeKey) => {
    this.setState({
      activeKey,
    });
  };
  render () {
    return (
      <div>
        <Tabs
          renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick} />}
          renderTabContent={() => <TabContent />}
          activeKey={this.state.activeKey}
          onChange={this.onChange}
        >
          <TabPane tab={`專題申請`} key='1'>
            <GroupApply idCard={this.props.idCard} />
          </TabPane>
          <TabPane tab={`專題列表`} key='2'>
            <GroupList idCard={this.props.idCard} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Group
