import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

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

const tableData = [
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },
    {
        sem: "105下",
        name: '資料庫系統概',
        college: '資工系',
        grade: '87.87',
    },

];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableExampleComplex extends Component {
    state = {
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

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
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
                        {tableData.map( (row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={styles.tabColumn1}>{row.sem}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn0}>{row.name}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn1}>{row.college}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn0}>{row.grade}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </div>
        );
    }
}