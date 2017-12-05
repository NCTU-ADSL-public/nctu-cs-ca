import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const styles = {
    labelStyle: {
        fontFamily: 'Noto Sans CJK TC',
        color: '#434343'
    },
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
    tabColumn0: {
        cursor: 'pointer',
      //  background: '#ecfcf9',
       // border: '3px solid white',
    },
    tabColumn1: {
        cursor: 'pointer',
      //  background: '#f9f9f9',
      //  border: '3px solid white',
    },
    colorGreen: {
        cursor: 'pointer',
        color: '#418166',
    },
    colorBrown: {
        cursor: 'pointer',
        color: '#816039',
    },
    colorRed: {
        cursor: 'pointer',
        color: '#c61234',
    },
    header: {
        cursor: 'pointer',
        fontSize: '1.2em',
    },
    headerB: {
        cursor: 'pointer',
        fontSize: '1.5em',
        fontWeight: 700,
        color: '#35916e',
    },
};

export default class StudentTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: false,
            showCheckboxes: false,
            height: '60vh',

            studentListOrdered: [],
            orderBy: 'student_id',
        };

    }

    static defaultProps = {
        students: [
            {
                student_id: '0316000',
                sname: '流川楓',
                program: '網多',
                graduate: "0",
                graduate_submit: "0",
            }]
    };
    componentWillMount(){
        this.orderList(this.state.orderBy);
    }

    componentDidUpdate(NextProp, NextState){
        if( NextProp.students !== this.props.students ){
            this.orderList(this.state.orderBy);
        }
    }

    orderList(orderBy){
        let NewStudentList = [].concat(this.props.students)
            .sort((a, b) => {
                if(orderBy === 'student_id')
                    return parseInt(a.student_id) - parseInt(b.student_id);
                else if(orderBy === 'sname')
                    return a.sname.localeCompare(b.sname, 'zh-Hans-CN');
                else if(orderBy === 'program')
                    return a.program.localeCompare(b.program, 'zh-Hans-CN');
                else if(orderBy === 'graduate')
                    return a.graduate - b.graduate;
                else if(orderBy === 'graduate_submit')
                    return a.graduate_submit - b.graduate_submit;
                else
                    return a.student_id - b.student_id;
            }).map((row, i) =>
                <TableRow key={i}
                          selected={row.selected}>
                    <TableRowColumn style={styles.tabColumn0}>{row.student_id}</TableRowColumn>
                    <TableRowColumn style={styles.tabColumn0}>{row.sname}</TableRowColumn>
                    <TableRowColumn style={styles.tabColumn0}>{row.program}</TableRowColumn>
                    <TableRowColumn style={styles.tabColumn0}>{row.graduate==="1" ? '可畢業' : '未達畢業標準'}</TableRowColumn>
                    <TableRowColumn
                        style={ row.graduate_submit==="2" ? styles.colorGreen :
                            row.graduate_submit==="1" ? styles.colorBrown :
                                styles.colorRed }>
                        {row.graduate_submit==="1" ? '已送審' :
                            row.graduate_submit==="2" ? '完成審核' : '未送審'}
                    </TableRowColumn>
                </TableRow>
            );

        this.setState({
            studentListOrdered: NewStudentList,
            orderBy: orderBy,
        });
    }

    handleRowClick = (rowIndex) => {
        this.props.parentFunction(this.props.students[rowIndex]);
    };


    render() {
        return (

            <div>

                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    onCellClick={this.handleRowClick}
                    style={styles.labelStyle}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="以學號排序">
                                <div style={this.state.orderBy === 'student_id' ? styles.headerB : styles.header} onClick={ () => this.orderList('student_id') }>
                                    學號{this.state.orderBy === 'student_id' ? '↓' : ''}
                                </div>
                            </TableHeaderColumn>
                            <TableHeaderColumn tooltip="以學生姓名排序">
                                <div style={this.state.orderBy === 'sname' ? styles.headerB : styles.header} onClick={ () => this.orderList('sname') }>
                                    學生姓名{this.state.orderBy === 'sname' ? '↓' : ''}
                                </div>
                            </TableHeaderColumn>
                            <TableHeaderColumn tooltip="以組別排序">
                                <div style={this.state.orderBy === 'program' ? styles.headerB : styles.header} onClick={ () => this.orderList('program') }>
                                    組別{this.state.orderBy === 'program' ? '↓' : ''}
                                </div>
                            </TableHeaderColumn>
                            <TableHeaderColumn tooltip="以畢業狀況排序">
                                <div style={this.state.orderBy === 'graduate' ? styles.headerB : styles.header} onClick={ () => this.orderList('graduate') }>
                                    畢業狀況{this.state.orderBy === 'graduate' ? '↓' : ''}
                                </div>
                            </TableHeaderColumn>
                            <TableHeaderColumn tooltip="以送審狀態排序">
                                <div style={this.state.orderBy === 'graduate_submit' ? styles.headerB : styles.header} onClick={ () => this.orderList('graduate_submit') }>
                                    送審狀態{this.state.orderBy === 'graduate_submit' ? '↓' : ''}
                                </div>
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.studentListOrdered}
                    </TableBody>
                </Table>


            </div>
        );
    }

}