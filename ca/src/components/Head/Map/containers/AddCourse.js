import React from 'react'
import { connect } from 'react-redux'
import { addCourse } from '../actions'

let AddCourse = ({ dispatch }) => {
    let input

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addCourse(input.value))
                input.value = ''
            }}>
                <input ref={node => {
                    input = node
                }} />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
}
AddCourse = connect()(AddCourse);

export default AddCourse;