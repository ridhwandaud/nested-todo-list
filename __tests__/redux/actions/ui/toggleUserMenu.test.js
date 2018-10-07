import configureMockStore from 'redux-mock-store'
import expect from 'expect'

import { commonUiActions } from '../../../../redux/reducers/uiReducer'
import { toggleUserMenu } from '../../../../redux/actions/ui/toggleUserMenu'

const mockStore = configureMockStore()

describe('toggleUserMenu dispatch', () => {
    it('dispatch successful', () => {
        const store = mockStore({})
        store.dispatch(toggleUserMenu(true))

        expect(store.getActions()).toEqual([{
            type: commonUiActions.TOGGLE_USER_MENU,
            value: true
        }])
    })
})