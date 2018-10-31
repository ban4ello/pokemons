const counterNode = document.getElementById('count');
const PreviousCounterNode = document.getElementById('previous-count');
const Results = document.getElementById('results');
     const createStore = (reducer, initialState) => {
       const store = {};
       store.state = initialState;
       store.listeners = [];
       store.getState = () => store.state;
       store.subscribe = listener => {
         store.listeners.push(listener);
       };
       store.dispatch = action => {
         console.log('> Action', action);
         store.state = reducer(store.state, action);
         store.listeners.forEach(listener => listener());
       };
       return store;
     };

     const getInitialState = () => {
       return {
         count: 0,
         previousCount: 0,
       };
     };
     const reducer = (state = getInitialState(), action) => {
       switch (action.type) {
         case 'COUNT':
           const nextState = {
             count: state.count + action.payload.count,
             previousCount: state.count,
           };
           return nextState;
         case 'SOME_TYPE':
           const some = {
             results: action.payload.results,
           };
           return some;

         default:
           return state;
       }
     };
     const store = createStore(reducer);
     store.subscribe(() => {
       const state = store.getState();
       const count = state.count;
       const previousCount = state.previousCount;
       counterNode.innerHTML = count;
       PreviousCounterNode.innerHTML = previousCount;
       Results.innerHTML = store.getState().state.results;
     });
     // A simple event to dispatch changes
     document.addEventListener('click', () => {
       console.log('----- Previous state', store.getState());
       store.dispatch({
         type: 'COUNT',
         payload: {
           count: Math.ceil(Math.random() * 10),
           previousCount: store.getState(),
         },
       });
       console.log('+++++ New state', store.getState());
     });
     document.addEventListener('dblclick', () => {
       store.dispatch({
         type: 'SOME_TYPE',
         payload: {
           results: 'sucsses',
         },
       });
       console.log('+++++ New state', store.getState());
     });
     store.dispatch({}); // Sets the inital state
