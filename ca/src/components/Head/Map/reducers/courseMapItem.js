const courseMapItem = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_COURSE':
            return {
                id: action.id,
                cos_cname:action.cname,
                grade:action.grade,
                semester:action.semester,
                suggest:action.suggest,
                pre:action.pre
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                completed: !state.completed
            })

        default:
            return state
    }
}

const courseMapItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COURSE':
            return [
                ...state,
                courseMapItem(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t =>
                courseMapItem(t, action)
            )
        default:
            return state
    }
}

export default courseMapItems