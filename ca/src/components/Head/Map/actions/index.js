let nextTodoId = 0
export const addTodo = (cosCame,grade,semester,suggest,pre) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        cosCame,grade,semester,suggest,pre
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

export const setPascos = (cosCame) => {
    return {
        type: 'SET_PASCOS',
        cosCame
    }
}