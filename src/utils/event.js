
export function simpleEvent(callback) {
  return (state, ...args) => {
    const event = args[args.length - 1]
    if (event.stopPropagation) event.stopPropagation()
    if (event.preventDefault) event.preventDefault()
    if (typeof callback === 'function') {
      setTimeout(() => callback(...args), 0)
    }
    return state
  }
}

export function stateEvent(callback) {
  return (...args) => {
    const event = args[args.length - 1]
    if (event.stopPropagation) event.stopPropagation()
    if (event.preventDefault) event.preventDefault()
    return callback(...args)
  }
}

export function stateStoreEvent(stateCallback, storeCallback) {
  return function() {
    const event = arguments[arguments.length - 1]
    if (event.stopPropagation) event.stopPropagation()
    if (event.preventDefault) event.preventDefault()
    if (typeof storeCallback === 'function') {
      setTimeout(() => storeCallback.apply(this, arguments), 0)
    }
    if (typeof stateCallback === 'function') {
      return stateCallback.apply(this, arguments)
    }
    return args[0]
  }
}
