import React from 'react';
import './CourseList.css';

//for table
import CourseTable from './CourseTable';

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
            initItems: this.props.items,
            items: [],
        };

        this.filterList = this.filterList.bind(this);

    }


    componentWillMount(){
        this.setState({items: this.state.initItems});
    }

    filterList(event){
        let updatedList = this.state.initItems;
        updatedList = updatedList.filter(function(item){
            return (item.name.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1)||
                (item.sem.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1);
        });
        this.setState({items: updatedList});
    }

    searchCallback = (item) => {
        this.props.parentFunction(item);
    };

    render(){
        return (
            <div id="page">
                <div className="filter">
                    <div className="filter-list">
                        <input type="text" placeholder="搜尋 課程名稱/ 學期" onChange={this.filterList}/>
                    </div>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <CourseTable items={this.state.items} parentFunction={this.searchCallback}/>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }





}