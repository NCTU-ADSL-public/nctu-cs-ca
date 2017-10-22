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
        background: '#ecfcf9',
        border: '3px solid white',
    },
    tabColumn1: {
        background: '#f9f9f9',
        border: '3px solid white',
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
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: 'auto',
        };
    }

    static defaultProps = {
        students: [
            {
                name: '流川楓',
                group: '網多',
                graduated: '已畢業',
            }]
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
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="學生姓名">學生姓名</TableHeaderColumn>
                            <TableHeaderColumn tooltip="組別">組別</TableHeaderColumn>
                            <TableHeaderColumn tooltip="畢業狀況">畢業狀況</TableHeaderColumn>
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