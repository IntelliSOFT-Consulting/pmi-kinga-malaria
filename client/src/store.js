import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import rootReducer from '@/redux/reducers/rootReducer';

const userInfo = Cookie.get('userInfo') || null;
const testReport = localStorage.getItem('test_yn') || 'no';
const parsed = userInfo ? JSON.parse(userInfo) : null;

const initialState = {
  userSignin: { userInfo: parsed },
  getTestReport: { testReport },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
