import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { createStore } from 'redux';
import todoApp from '../reducers';


let store = createStore(todoApp);

let input;
class AddTodo extends React.Component {

    render(){
        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    store.dispatch(addTodo(input.value))
                    input.value = ''
                }}>
                    <input ref={node => {
                        input = node
                    }} />
                    <button type="submit">
                        ADD TODO{this.props.data}
                    </button>
                </form>
            </div>
        )

    };
}
AddTodo = connect()(AddTodo)

export default AddTodo