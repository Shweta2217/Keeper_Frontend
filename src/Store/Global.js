import {createStore} from 'redux';

function reducer(state = {isLogin: localStorage.getItem("Token")? true : false}, action) {
    
    if (action.type === 'LoggedIn') 
        return { isLogin : true};

    return state;
        
}
let store = createStore(reducer);
export default store;
