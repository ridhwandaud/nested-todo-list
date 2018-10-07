export const testReducer = (action, reducer, expectedState) => {
    const state = {}
    const result = reducer(state, action)
    expect(result).toEqual(expectedState)
}