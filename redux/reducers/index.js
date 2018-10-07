import { combineReducers } from 'redux'
import { uiReducer } from './uiReducer'
import { authReducer } from './authReducer'
import { apiReducer } from './apiReducer'
import { dataReducer } from './dataReducer'

import stateModel from '../stateModel'

const mainReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    api: apiReducer,
    data: dataReducer
})

const rootReducer = (state=stateModel, action) => {
    switch(action.type){
    case 'RESET_APP':
        return stateModel
    default:
        return mainReducer(state, action)
    }
}

export default rootReducer