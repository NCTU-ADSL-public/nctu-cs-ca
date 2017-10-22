import React from 'react';
import './StudentList.css';

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

export default class StudentList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {/*
            initStudents: [
                {
                    name: '流川楓',
                    group: '網多',
                    graduated: '已畢業',
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
                    name: '陳冠廷',
                    group: '資工A',
                    graduated: '已畢業',
                },
                {
                    name: '郭蕎',
                    group: '資電',
                    graduated: '已畢業',
                },
                {
                    name: '流川楓',
                    group: '網多',
                    graduated: '已畢業',
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
                    name: '陳冠廷',
                    group: '資工A',
                    graduated: '已畢業',
                },
                {
                    name: '郭蕎',
                    group: '資電',
                    graduated: '已畢業',
                },
                {
                    name: '流川楓',
                    group: '網多',
                    graduated: '已畢業',
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
                    name: '陳冠廷',
                    group: '資工A',
                    graduated: '已畢業',
                },
                {
                    name: '郭蕎',
                    group: '資電',
                    graduated: '已畢業',
                },
                {
                    name: '流川楓',
                    group: '網多',
                    graduated: '已畢業',
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
                    name: '陳冠廷',
                    group: '資工A',
                    graduated: '已畢業',
                },
                {
                    name: '郭蕎',
                    group: '資電',
                    graduated: '已畢業',
                },
                {
                    name: '流川楓',
                    group: '網多',
                    graduated: '已畢業',
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
                    name: '陳冠廷',
                    group: '資工A',
                    graduated: '已畢業',
                },
                {
                    name: '郭蕎',
                    group: '資電',
                    graduated: '已畢業',
                },


            ],
            */
            initStudents: this.props.students,
            students: [],
        };

        this.filterList = this.filterList.bind(this);

    }


    componentWillMount(){
        this.setState({students: this.state.initStudents});
    }

    filterList(event){
        let updatedList = this.state.initStudents;
        updatedList = updatedList.filter(function(student){
            return (student.name.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)||
                (student.group.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)||
                (student.graduated.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1);
        });
        this.setState({students: updatedList});
    }

    searchCallback = (student) => {
        this.props.parentFunction(student);
    };

    render(){
        return (
            <div id="page">
                <div className="filter">
                    <div className="filter-list">
                        <input type="text" placeholder="搜尋 學生姓名/ 組別/ 畢業狀態" onChange={this.filterList}/>
                    </div>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <StudentTable students={this.state.students} parentFunction={this.searchCallback}/>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }





}