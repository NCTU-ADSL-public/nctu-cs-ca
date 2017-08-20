let nextTodoId = 0
export const addCourse = (text) => {
    return {
        type: 'ADD_COURSE',
        id: nextCourseId++,
        cos_cname,
        grade,
        semester,
        suggest,
        pre
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