
export const addCourse = (
    cos_cname,
    grade,
    id,
    pre,
    semester,
    suggest) => {
    return {
        type: 'ADD_COURSE',
        cos_cname,
        grade,
        id,
        pre,
        semester,
        suggest,
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