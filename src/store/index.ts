import {combineReducers, configureStore, ThunkMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './reducers'
const rootReducer = combineReducers(reducers)

const middleware: ThunkMiddleware[] = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;