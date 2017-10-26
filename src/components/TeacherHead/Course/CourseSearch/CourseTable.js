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
export default class CourseTable extends Component {

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
        items: [
            {
                id: 'dcp9999',
                sem: '105下',
                name: '資料庫系統概論',
                avgScore: '81.5',
                pAvgScore: '87.8',
            },
        ]
    };

    handleRowClick = (rowIndex) => {
        this.props.parentFunction(this.props.items[rowIndex]);
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
                            <TableHeaderColumn tooltip="學期">學期</TableHeaderColumn>
                            <TableHeaderColumn tooltip="課程名稱">課程名稱</TableHeaderColumn>
                            <TableHeaderColumn tooltip="全部平均成績">平均成績</TableHeaderColumn>
                            <TableHeaderColumn tooltip="已通過學生平均成績">已通過平均成績</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.props.items.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={styles.tabColumn0}>{row.sem}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn0}>{row.name}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn1}>{row.avgScore}</TableRowColumn>
                                <TableRowColumn style={styles.tabColumn0}>{row.pAvgScore}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </div>
        );
    }

}