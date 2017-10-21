import React from 'react'
import './StudentList.css';

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
            initialItems: [
                "Apples",
                "Broccoli",
                "Chicken",
                "Bacon",
                "Eggs",
                "Salmon",
                "Granola",
                "Bananas",
                "Beer",
                "Wine",
                "Yogurt"
            ],
            items: []
        };

        this.filterList = this.filterList.bind(this);
    }

    componentWillMount(){
        this.setState({items: this.state.initialItems});
    }

    filterList(event){
        let updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
    }
    render(){
        return (
            <div className="filter-list">
                <input type="text" placeholder="Search" onChange={this.filterList}/>
                <List items={this.state.items}/>
            </div>
        );
    }
}


class List extends React.Component {
    render(){
        return (
            <ul>
                {
                    this.props.items.map(function(item) {
                        return <li key={item}>{item}</li>
                    })
                }
            </ul>
        )
    }
}


