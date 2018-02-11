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
    table: {
        fontFamily: 'Noto Sans CJK TC',
        color: '#434343',
        tableLayout: 'auto',
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
};

export default class CourseTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: false,
            fixedFooter: true,
            stripedRows: true,
            showRowHover: true,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: 900,

            itemListRows: [],
            itemList: [],
            orderBy: 'sem',
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

    componentWillMount(){
        this.orderList(this.state.orderBy);
    }

    componentDidUpdate(NextProp, NextState){
        if( NextProp.items !== this.props.items ){
            this.orderList(this.state.orderBy);
        }
    }

    orderList(orderBy){
        let NewItemList = [].concat(this.props.items)
            .sort((a, b) => {
                if(orderBy === 'name')
                    return a.name.localeCompare(b.name, 'zh-Hans-CN');
                else if(orderBy === 'sem')
                    return a.sem.localeCompare(b.sem, 'zh-Hans-CN');
            });

        let itemListRows = NewItemList
            .map((row, i) =>
                <TableRow key={i}>
                    <TableRowColumn style={styles.tabColumn0}>{row.sem}</TableRowColumn>
                    <TableRowColumn style={styles.tabColumn0}>{row.name}</TableRowColumn>
                    <TableRowColumn style={styles.tabColumn0}>{row.avgScore}</TableRowColumn>
                    <TableRowColumn style={styles.tabColumn0}>{row.pAvgScore}</TableRowColumn>
                </TableRow>
            );

        this.setState({
            itemList: NewItemList,
            itemListRows,
            orderBy,
        });
    }



    handleRowClick = (rowIndex) => {
        this.props.parentFunction(this.state.itemList[rowIndex]);
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
                    style={styles.table}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="學期">
                                <div style={this.state.orderBy === 'sem' ? styles.headerB : styles.header} onClick={ () => this.orderList('sem') }>
                                    學期{this.state.orderBy === 'sem' ? '↓' : ''}
                                </div>
                            </TableHeaderColumn>
                            <TableHeaderColumn tooltip="課程名稱">
                                <div style={this.state.orderBy === 'name' ? styles.headerB : styles.header} onClick={ () => this.orderList('name') }>
                                    課程名稱{this.state.orderBy === 'name' ? '↓' : ''}
                                </div>
                            </TableHeaderColumn>
                            <TableHeaderColumn tooltip="全部平均成績">
                                <div style={styles.header}>
                                    平均成績
                                </div>
                            </TableHeaderColumn>
                            <TableHeaderColumn tooltip="已通過學生平均成績">
                                <div style={styles.header}>
                                    平均成績+
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
                        {this.state.itemListRows}
                    </TableBody>
                </Table>


            </div>
        );
    }

}