import {createStore , combineReducers } from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import authReducer from './reducers/authReducers'

const combinedreducer =  combineReducers({
    authreducer: authReducer
})
// create a makeStore function
const makeStore = context => createStore(combinedreducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});