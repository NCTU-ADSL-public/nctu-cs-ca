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

        this.state = {
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
            let grad = student.graduated ? '可畢業' : '未達畢業標準';
            return (student.name.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)||
                (student.group.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)||
                (student.id.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)||
                (grad.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1);
        });
        this.setState({students: updatedList});
    }

    //input press ENTER
    handleKeyPress = (e) => {
        if (e.key === 'Enter' && this.state.students[0] !== undefined) {
            this.props.parentFunction(this.state.students[0]);
        }
    };

    searchCallback = (student) => {
        this.props.parentFunction(student);
    };

    render(){
        return (
            <div id="page">
                <div className="filter">
                    <div className="filter-list">
                        <input type="text"
                               placeholder="搜尋 學號/ 學生姓名/ 組別/ 畢業狀態"
                               onChange={this.filterList}
                               onKeyPress={this.handleKeyPress}/>
                    </div>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <StudentTable students={this.state.students} parentFunction={this.searchCallback}/>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }





}