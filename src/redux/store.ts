import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';

import footer from './reducers/footer';
import tournamentPanel from './reducers/tournamentPanel';
import table from './reducers/table';

const combinedReducer = combineReducers({
  footer,
  tournamentPanel,
  table
})

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }

const reducer = (state: any, action: ActionType) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state?.count?.count) nextState.count.count = state.count.count // preserve count value on client side navigation
        return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
}

export const wrapper = createWrapper(initStore)

type ActionType = {
    type: string,
    payload: any
}