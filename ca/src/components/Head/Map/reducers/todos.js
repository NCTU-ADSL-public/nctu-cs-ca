const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                cosCame: action.cosCame,
                completed: 0,
                grade: action.grade,
                semester:action.semester,
                suggest:action.suggest,
                pre:action.pre,
                suggest_flag:false,
                pre_flag:false,
            };
        case 'SET_PASCOS':
            if (state.cosCame !== action.cosCame) {
                return state
            }

            if(action.index===0){
                return Object.assign({}, state, {
                    completed: 1
                });
            }
            if(action.index===1){
                return Object.assign({}, state, {
                    completed: 2
                });
            }
        case 'HANDLE_DATA':
            if (state.cosCame !== action.pre) {
                return Object.assign({}, state, {
                    pre_flag: false
                });
            }

            return Object.assign({}, state, {
                pre_flag: !state.pre_flag
            });

        default:
            return state
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'SET_PASCOS':
            return state.map(t =>
                todo(t, action)
            );
        case 'HANDLE_DATA':
            return state.map(t =>
                todo(t, action)
            );

        default:
            return state
    }
}

export default todos