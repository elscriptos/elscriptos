
export default function reduxSubscription(store, mapStoreToState) {
  return (dispatch, state) => {
    const keys = Object.keys(state)
    return store.subscribe(() => {
      const storeState = store.getState()
      const nextState = { ...state, ...mapStoreToState(storeState) }
      const update = keys.some(key => state[key] !== nextState[key])
      if (update) {
        dispatch(() => nextState)
      }
    })
  }
}
