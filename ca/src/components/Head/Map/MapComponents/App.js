import React from 'react'
import VisibleTodoList from '../containers/VisibleTodoList'
import Footer from './Footer'
class App extends React.Component{

    constructor(props) {
        super(props);
        console.log(this.props.grad);
    }
    render(){
            return(
            <div>
                <VisibleTodoList grad={this.props.grad} sem={this.props.sem}/>
                <Footer/>
            </div>
        )
    }
}

export default App