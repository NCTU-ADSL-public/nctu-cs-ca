const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                cosCame: action.cosCame,
                completed: false,
                grade: action.grade,
                semester:action.semester,
                suggest:action.suggest,
                pre:action.pre,
                suggest_flag:false,
                pre_flag:false,
            };
        case 'SET_PASCOS':
            if(action.index===0){
                return Object.assign({}, state, {
                    completed: false
                });
            }
            else if(action.index===1){
                if (state.cosCame !== action.cosCame) {
                    console.log("1 0")
                    return Object.assign({}, state, {
                        completed: true
                    });
                }
                    console.log("1 1")
                    return Object.assign({}, state, {
                        completed: false
                    });
            }
            else if(action.index===2){
                console.log("2 0")
                if (state.cosCame !== action.cosCame) {
                    console.log("1")
                    return Object.assign({}, state, {
                        completed: false
                    });
                }
                console.log("2 1")

                return Object.assign({}, state, {
                    completed: true
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