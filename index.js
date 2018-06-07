const ADD_TODO    = 'ADD_TODO',
      REMOVE_TODO = 'REMOVE_TODO',
      TOGGLE_TODO = 'TOGGLE_TODO',
      ADD_GOAL    = 'ADD_GOAL',
      REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction(todo){
    return {
        type: ADD_TODO,
        todo
    };
}

function removeTodoAction(id){
    return {
        type: REMOVE_TODO,
        id
    };
}

function toggleTodoAction(id){
    return{
        type: TOGGLE_TODO,
        id
    };
}

function addGoalAction(goal){
    return{
        type: ADD_GOAL,
        goal
    };
}

function removeGoalAction(id){
    return{
        type: REMOVE_GOAL,
        id
    };
}

function todos (state = [], action){
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id);
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo : 
                Object.assign({}, todo, {complete: !todo.complete}));
        default:
            return state;
    }
}

function goals (state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);
        default:
            return state;
    }
}

function createStore() {
    let state;
    let listeners = [];
    const getState = () => state;
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    };
    const dispatch = (action) => {
        state = todos(state, action);
        listeners.forEach((listener) => listener);
    };
    return {
        getState,
        subscribe, 
        dispatch
    };
}

function app (state = {}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    };
}

const store = createStore(app);

store.subscribe(() => {
    console.log('The new state is: ', store);
});
store.subscribe(() => {
    console.log('The store was subscribed');
});

store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the doggie',
    complete: false
}));


store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash the dishes',
    complete: false
}));

store.dispatch(addTodoAction({
    id: 2,
    name: 'Hunt rabbits',
    complete: true
}));

store.dispatch(removeTodoAction(0));
store.dispatch(removeTodoAction(1));
store.dispatch(toggleTodoAction(2));

store.dispatch(addTodoAction({
    id: 3,
    name: 'Get the number',
    complete: false
}));

store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux'
}));

store.dispatch(addGoalAction({
    id: 1,
    name: 'Master React'
}));

store.dispatch(addGoalAction({
    id: 2,
    name: 'Become a Viking!'
}));

store.dispatch(addGoalAction({
    id: 3,
    name: 'Learn cow tipping'
}));

store.dispatch(removeGoalAction(1));
store.dispatch(removeGoalAction(2));
