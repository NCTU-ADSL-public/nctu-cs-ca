import React from 'react';
//
import axios from 'axios';
import CourseList from './CourseSearch/CourseList';
import ScoreChart from './ScoreChart';
import GaugeChart from './GaugeChart';



// const scoreDetail = {
//     avgScore: 87,
//     pAvgScore: 94.9,
//     member: 195,
//     passed: 170,
//     max: 100,
// };
//
// const scoreChartDetail = {
//     passed: [0, 0, 0, 0, 0, 25, 50, 33, 12, 1],
//     failed: [0, 3, 5, 7, 15, 0, 0, 0, 0, 0],
// };

const styles = {
    container: {
    },
    courseList: {
        width: '50%',
        display: 'inline-block'
    },
    course: {
        main: {
            width: '50%',
            padding: '40px 20px 0 0',
            display: 'inline-block',
            verticalAlign: 'top'
        },
        title: {
            padding: '10px 0 0 60px',
            height: 100,
            width: '100%',
            fontSize: 24,
            fontWeight: 500,
            color: '#7a7a7a',
        },
        box: {
            margin: '0 auto',
            padding: 20,
            width: 400,
        },
        score:{
            margin: '0 auto',
            padding: 10,
            textAlign: 'center',
            width: 600,
            height: 200,
        },
        scoreItem:{
            margin: '0 auto',
            float: 'left',
            padding: 10,
            width: 186,
        }
    },
    score:{
        fontSize: 32,
        fontWeight: 500,
        padding: '3px 0 0 0px',
    }
};

export default class index extends React.Component {

    state = {
        activeKey: '1',
        start: 0,
        //for passing Course id selected by List
        item: {
            id: 'dcp9999',
            sem: '105下',
            name: '資料庫系統概論',
            avgScore: '81.5',
            pAvgScore: '87.8',
        },

        scoreDetail: {
            avgScore: 87,
            pAvgScore: 94.9,
            member: 115,
            passed: 110,
            max: 100,
        },

        scoreChartDetail: {
            passed: [0, 0, 0, 0, 0, 25, 50, 33, 12, 1],
            failed: [0, 3, 5, 7, 15, 0, 0, 0, 0, 0],
        },

        initItem: [
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
          {
            id: 'dcp9997',
            sem: '105下',
            name: '計算機圖學概論',
            avgScore: '80.7',
            pAvgScore: '83.2',
          },
          {
            id: 'dcp9996',
            sem: '105上',
            name: '建築概論',
            avgScore: '88.1',
            pAvgScore: '97.3',
          },
          {
            id: 'dcp9995',
            sem: '105上',
            name: '離散數學',
            avgScore: '77.87',
            pAvgScore: '94.87',
          },
          {
            id: 'dcp9994',
            sem: '105上',
            name: '密碼學概論',
            avgScore: '60',
            pAvgScore: '78',
          },
          {
            id: 'dcp9993',
            sem: '105上',
            name: '數位電路設計',
            avgScore: '86.6',
            pAvgScore: '94.87',
          },
          {
            id: 'dcp9992',
            sem: '105下',
            name: '數位電路實驗',
            avgScore: '87.7',
            pAvgScore: '94.2',
          },
          {
            id: 'dcp9998',
            sem: '105上',
            name: '無線網路',
            avgScore: '87.1',
            pAvgScore: '94.3',
          },

        ],
    };

    componentWillMount = () => {
        axios.post('/professors/courseInfo/courses', {
            id: 'T9229',
        }).then(res => {
            console.log(res);
            this.setState({ initItem: res.data });
        }).catch(err => {
            console.log(err);
        });
    }

    onTabClick = (key) => {
        if (key === this.state.activeKey) {
            this.setState({
                activeKey: '1',
            });
        }
    };

    _randInt = (num) => ( Math.floor( Math.random()*10 + num ) );

    _randomSetScore = () => {
        let member = Math.floor( Math.random()*20 + 100 );

        let scoreDetail = {
            avgScore: ( Math.random()*20 + 70 ).toFixed(1),
            pAvgScore: ( Math.random()*20 + 78 ).toFixed(1),
            member: member,
            passed: Math.floor( member * ( Math.random()*0.3 + 0.6 ) ),
            max: Math.floor( ( Math.random()*5 + 95 ) ),
        };
        let scoreChartDetail = {
            passed: [0, 0, 0, 0, 0, this._randInt(20),  this._randInt(50),  this._randInt(33),  this._randInt(12),  this._randInt(1)],
            failed: [0,  this._randInt(3),  this._randInt(5),  this._randInt(7),  this._randInt(15), 0, 0, 0, 0, 0],
        };

        console.log(scoreChartDetail);

        this.setState({ scoreDetail, scoreChartDetail, });
    };

    searchCallback = (item) => {
        this.setState({ item });

        this._randomSetScore();
    };

    render() {
        return (
            <div style={styles.container}>

                <div style={styles.courseList}>
                    <CourseList items={this.state.initItem} parentFunction={this.searchCallback}/>
                </div>

                <div style={styles.course.main}>
                    <div style={styles.course.title}>[{this.state.item.unique_id}] {this.state.item.sem} - {this.state.item.cos_cname}</div>
                    <div style={styles.course.score}>
                        <div style={styles.course.scoreItem}> <ShowScore title={'平均成績'} score={this.state.scoreDetail.avgScore}/> </div>
                        <div style={styles.course.scoreItem}> <ShowScore title={'及格平均成績'} score={this.state.scoreDetail.pAvgScore}/> </div>
                        <div style={styles.course.scoreItem}> <ShowScore title={'修課人數'} score={this.state.scoreDetail.member}/> </div>
                        <div style={styles.course.scoreItem}> <ShowScore title={'及格人數'} score={this.state.scoreDetail.passed}/> </div>
                        <div style={styles.course.scoreItem}> <ShowScore title={'不及格人數'} score={this.state.scoreDetail.member - this.state.scoreDetail.passed}/> </div>
                        <div style={styles.course.scoreItem}> <ShowScore title={'最高分'} score={this.state.scoreDetail.max}/> </div>
                    </div>
                    <div style={styles.course.box}> <GaugeChart member={this.state.scoreDetail.member} passed={this.state.scoreDetail.passed}/> </div>
                    <div style={styles.course.box}> <ScoreChart detail={this.state.scoreChartDetail}/> </div>
                </div>

            </div>
        );
    }
}


const ShowScore = (props) => (
    <div>
        <div>{props.title}</div>
        <div style={styles.score}>{props.score}</div>
    </div>
);

