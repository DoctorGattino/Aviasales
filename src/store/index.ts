import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import apiReducer from './apiSlice';
import ticketReducer from './ticketsSlice';

const rootReducer = combineReducers({
  tickets: apiReducer,
  filter: ticketReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>; // Тип корневого состояния
export type AppDispatch = typeof store.dispatch; // Тип диспатча

export default store;
