import React from 'react';
import './StudentList.css';
//for Chips
import Chip from 'material-ui/Chip';
import {blue300} from 'material-ui/styles/colors';
//for table
import StudentTable from './StudentTable';
//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: 'rgba(0, 0, 0, 0)',
        accent1Color: '#00AEAE',
    },
});

const styles = {
    labelStyle: {
        fontFamily: 'Noto Sans CJK TC',
    },
    chip: {
        margin: 6,
    },
    wrapper: {
        padding: '0 10px 20px 20px',
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export default class StudentList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            initStudents: this.props.students,
            students: [],

            groupA: true,
            groupB: true,
            groupC: true,
            groupD: true,
            gGrad: true,
            gSubmit: true,
        };

        this.filterList = this.filterList.bind(this);
        this.filterListGroup = this.filterListGroup.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    componentWillMount(){
        this.setState({students: this.state.initStudents});
    }

    componentDidMount(){
        this.filterListGroup(999);
        this.setState({students: this.state.initStudents});
    }

    componentDidUpdate(prevProps, prevState){
        if( prevProps.students !== this.props.students ||
            prevState.initStudents !== this.state.initStudents) {
            this.setState({initStudents: this.props.students,});
            this.filterListGroup(999);
        }
    }


    filterList(event){
        let updatedList = this.state.initStudents;
        let gA = this.state.groupA;
        let gB = this.state.groupB;
        let gC = this.state.groupC;
        let gD = this.state.groupD;
        let gG = this.state.gGrad;
        let gS = this.state.gSubmit;
        updatedList = updatedList.filter(function(student){
            let grad = student.graduate==="1" ? '可畢業' : '未達畢業標準';
            return (
                (student.sname.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)||
                (student.program.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)||
                (student.student_id.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)||
                (grad.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)
            )&&(
                ((student.program.toLowerCase().search('資工a') !== -1) && gA )||
                ((student.program.toLowerCase().search('資工b') !== -1) && gB )||
                ((student.program.toLowerCase().search('網多') !== -1) && gC )||
                ((student.program.toLowerCase().search('資電') !== -1) && gD )
            )&&(    ((student.graduate==='0' || !student.graduate) && !gG)|| gG
            )&&(    ((student.graduate_submit==='1' || student.graduate_submit==='0' || !student.graduate_submit) && !gS) || gS );
        });
        this.setState({students: updatedList});
    }

    filterListGroup(groupNum){
        let updatedList = this.state.initStudents;
        let gA = this.state.groupA;
        let gB = this.state.groupB;
        let gC = this.state.groupC;
        let gD = this.state.groupD;
        let gG = this.state.gGrad;
        let gS = this.state.gSubmit;
        if (groupNum === 0) {
            gA = !this.state.groupA;
            this.setState({groupA: gA});
        } else if (groupNum === 1) {
            gB = !this.state.groupB;
            this.setState({groupB: gB});
        } else if (groupNum === 2) {
            gC = !this.state.groupC;
            this.setState({groupC: gC});
        } else if (groupNum === 3) {
            gD = !this.state.groupD;
            this.setState({groupD: gD});
        } else if (groupNum === 4){
            gG = !this.state.gGrad;
            this.setState({gGrad: gG});
        } else if (groupNum === 5){
            gS = !this.state.gSubmit;
            this.setState({gSubmit: gS});
        }
        updatedList = updatedList.filter(function(student){
            return (    ((student.program.toLowerCase().search('資工a') !== -1) && gA )||
                        ((student.program.toLowerCase().search('資工b') !== -1) && gB )||
                        ((student.program.toLowerCase().search('網多') !== -1) && gC )||
                        ((student.program.toLowerCase().search('資電') !== -1) && gD )
                )&&(    ((student.graduate==='0') && !gG)|| gG
                )&&(    ((student.graduate_submit==='1' || student.graduate_submit==='0') && !gS) || gS );
        });
        this.setState({students: updatedList});
    }


    //input press ENTER
    handleKeyPress = (e) => {
        if (e.key === 'Enter' && this.state.students[0] !== undefined) {
            let sid = this.state.students[0].student_id;
            window.open('/assistants/head/s/' + sid);
        }
    };

    searchCallback = (student) => {
        let sid = student.student_id;
        window.open('/assistants/head/s/' + sid);
    };

    handleTouchTap(groupNum) {
        this.filterListGroup(groupNum);
    }


    render(){
        return (
            <div id="page">
                <div className="filter">

                    <div className="filter-list">
                        <input type="text"
                               placeholder="搜尋 學號/ 學生姓名/ 組別/ 畢業狀態"
                               onChange={this.filterList}
                               onKeyPress={this.handleKeyPress}
                        />
                    </div>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <div style={styles.wrapper}>
                            <Chip
                                backgroundColor={this.state.gSubmit ? '#5fc86f' : '#CCC'}
                                onClick={ () => (this.handleTouchTap(5))}
                                style={styles.chip}
                                labelStyle={styles.labelStyle}>
                                完成審核
                            </Chip>
                            <Chip
                                backgroundColor={this.state.gGrad ? '#5fc86f' : '#CCC'}
                                onClick={ () => (this.handleTouchTap(4))}
                                style={styles.chip}
                                labelStyle={styles.labelStyle}>
                                可畢業
                            </Chip>
                            <Chip
                                backgroundColor={this.state.groupA ? blue300 : '#CCC'}
                                onClick={ () => (this.handleTouchTap(0))}
                                style={styles.chip}
                                labelStyle={styles.labelStyle}>
                                資工A班
                            </Chip>
                            <Chip
                                backgroundColor={this.state.groupB ? blue300 : '#CCC'}
                                onClick={ () => (this.handleTouchTap(1))}
                                style={styles.chip}
                                labelStyle={styles.labelStyle}>
                                資工B班
                            </Chip>
                            <Chip
                                backgroundColor={this.state.groupC ? blue300 : '#CCC'}
                                onClick={ () => (this.handleTouchTap(2))}
                                style={styles.chip}
                                labelStyle={styles.labelStyle}>
                                網多組
                            </Chip>
                            <Chip
                                backgroundColor={this.state.groupD ? blue300 : '#CCC'}
                                onClick={ () => (this.handleTouchTap(3))}
                                style={styles.chip}
                                labelStyle={styles.labelStyle}>
                                資電組
                            </Chip>
                        </div>
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <StudentTable students={this.state.students}
                                      parentFunction={this.searchCallback}
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }





}


