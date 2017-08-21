import React from 'react'
import Footer from './Footer'
import AddCourse from '../containers/AddCourse'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
    <div>
        <AddCourse />
        <VisibleTodoList />
        <Footer />
    </div>
)

export default App