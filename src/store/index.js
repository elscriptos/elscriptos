import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import { Creators } from './actionTypes'
import middleware from './middleware'
import { loadStore, saveStore } from '../services/persistence'

const store = createStore(
  reducer,
  applyMiddleware(
    middleware,
    () => next => action => {
      next(action)
    }
  )
)

const stateSaved = loadStore()

if (stateSaved) {
  store.dispatch(Creators.hydrated(stateSaved))
}

window.onbeforeunload = () => saveStore(store.getState())

export default store
