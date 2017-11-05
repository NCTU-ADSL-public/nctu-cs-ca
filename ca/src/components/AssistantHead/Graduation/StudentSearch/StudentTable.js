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
};

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
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
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '60vh',
        };

    }

    static defaultProps = {
        students: [
            {
                student_id: '0316000',
                sname: '流川楓',
                program: '網多',
                graduate: "0",
            }]
    };

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
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="學號">學號</TableHeaderColumn>
                            <TableHeaderColumn tooltip="學生姓名">學生姓名</TableHeaderColumn>
                            <TableHeaderColumn tooltip="組別">組別</TableHeaderColumn>
                            <TableHeaderColumn tooltip="畢業狀況">畢業狀況</TableHeaderColumn>
                            <TableHeaderColumn tooltip="送審狀態">送審狀態</TableHeaderColumn>
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
                                <TableRowColumn style={styles.tabColumn0}>{row.student_id}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn0}>{row.sname}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn1}>{row.program}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn0}>{row.graduate==="1" ? '可畢業' : '未達畢業標準'}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn0}>{row.graduate_submit==="1" ? '已送審' : row.graduate_submit==="2" ? '完成審核' : '未送審'}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </div>
        );
    }

}