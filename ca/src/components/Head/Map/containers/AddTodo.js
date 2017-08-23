import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { createStore } from 'redux';
import todoApp from '../reducers';




const mapDispatchToProps = (dispatch, ownProps) => {
    for(var i=0;i<ownProps.data.length;i++){
        console.log(ownProps.data[i]);
        dispatch(addTodo(ownProps.data[i]));
    }
}

let AddTodo = ({ dispatch }) => {

        return (
            <div>

            </div>
        )

}
AddTodo = connect(mapDispatchToProps)(AddTodo)

export default AddTodo