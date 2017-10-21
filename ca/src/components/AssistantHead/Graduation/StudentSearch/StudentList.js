import React from 'react';
import './StudentList.css';

//for table
import StudentTable from './StudentTable';

//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: 'Transparent',
        accent1Color: '#00AEAE',
    },
});

//main
export default class StudentList extends React.Component {
    render() {
        return (
            <FilteredList/>
        );
    }
}


class FilteredList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
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


            ],
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
            return student.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({students: updatedList});
    }
    render(){
        return (
            <div>
                <div className="filter-list">
                    <input type="text" placeholder="Search" onChange={this.filterList}/>
                </div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <StudentTable students={this.state.students}/>
                </MuiThemeProvider>
            </div>
        );
    }





}

/*
class List extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '500px',
        };
    }

    render() {
        return (

            <div>

                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="開課學期">學期</TableHeaderColumn>
                            <TableHeaderColumn tooltip="課程名稱">課程名稱</TableHeaderColumn>
                            <TableHeaderColumn tooltip="開課系所">系所</TableHeaderColumn>
                            <TableHeaderColumn tooltip="學生平均成績">平均成績</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.props.students.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={styles.tabColumn0}>{row.name}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn1}>{row.group}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn0}>{row.graduated}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </div>
        );
    }
}
*/


/*
const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
    tabColumn0: {
        background: '#ecfcf9',
        border: '3px solid white',
    },
    tabColumn1: {
        background: '#f9f9f9',
        border: '3px solid white',
    },
};
*/
/*
class StudentTable extends React.Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '500px',
        };
    }

    render() {
        return (

            <div>

                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="開課學期">學期</TableHeaderColumn>
                            <TableHeaderColumn tooltip="課程名稱">課程名稱</TableHeaderColumn>
                            <TableHeaderColumn tooltip="開課系所">系所</TableHeaderColumn>
                            <TableHeaderColumn tooltip="學生平均成績">平均成績</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.props.students.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={styles.tabColumn0}>{row.name}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn1}>{row.group}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn0}>{row.graduated}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </div>
        );
    }

}*/