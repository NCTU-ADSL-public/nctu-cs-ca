import React from 'react'
import VisibleTodoList from '../containers/VisibleTodoList'
import Footer from './Footer'
class App extends React.Component{
    render(){return(
        <div>
            <VisibleTodoList />
            <Footer/>
        </div>
    )
    }
}

export default App