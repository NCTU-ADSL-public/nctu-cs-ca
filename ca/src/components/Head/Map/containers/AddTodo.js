import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { createStore } from 'redux';
import todoApp from '../reducers';





let AddTodo = ({ dispatch }) => {

        return (
            <div>

            </div>
        )

}
AddTodo = connect()(AddTodo)

export default AddTodo