import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => {
        return(
            <div>
                <AddTodo data={this.props.data}/>
                <VisibleTodoList />
                <Footer />
            </div>
        )
}

export default App