import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import subscribe from '../reducers/subscribe';
export default configureStore = () => createStore(subscribe, applyMiddleware(thunk))