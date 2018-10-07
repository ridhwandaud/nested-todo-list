import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import stateModel from './stateModel'

let finalCreateStore = compose(
    applyMiddleware(thunk, createLogger())
)(createStore)

export default function configureStore(initialState = stateModel) {
    return finalCreateStore(rootReducer, initialState)
}