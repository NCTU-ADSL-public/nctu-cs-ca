import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import StudentsItem from './Student/StudentsItem'
import TeachersItem from './Teacher/TeachersItem'
import ScoreItem from './Score/ScoreItem'

const styles = {
  tab: {
    width: '30%',
    background: '#F5F5F5',
    color: '#7B7B7B',
    fontSize: '20px',
    fontWeight: 'bold',
    transition: 'color 0.3s, font-size 0.3s, width 0.3s',
  },
  tabs: {
    width: '80%',
    margin: 'auto',
    marginTop: '15px',
    marginButton: '15px'
  },
  selected: {
    width: '40%',
    color: 'rgb(0, 188, 212)',
    fontSize: '25px',
    transition: 'color 0.3s, font-size 0.3s, width 0.3s',
  }
};

export default class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Tabs
            onChange = { this.handleChange }
            value = { this.state.slideIndex }
            inkBarStyle = {{ background: 'rgb(0, 188, 212)', left: `${ 30 * this.state.slideIndex }%`, width: '40%' }}
            style = { styles.tabs }
          >
            <Tab style = {{ ...styles.tab, ...(this.state.slideIndex === 0 && styles.selected) }} label = "學生狀況" value = { 0 } />
            <Tab style = {{ ...styles.tab, ...(this.state.slideIndex === 1 && styles.selected) }} label = "教授狀況" value = { 1 } />
            <Tab style = {{ ...styles.tab, ...(this.state.slideIndex === 2 && styles.selected) }} label = "成績匯出" value = { 2 } />
          </Tabs>
          <SwipeableViews
            index = { this.state.slideIndex }
            onChangeIndex = { this.handleChange }
          >
            <div>
              <StudentsItem />
            </div>
            <div>
              <TeachersItem />
            </div>
            <div>
              <ScoreItem />
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}
