let nextTodoId = 0
export const addTodo = (cos_cname,grade,semester,suggest,pre) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        cos_cname,grade,semester,suggest,pre
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}