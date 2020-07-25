
export function simpleEvent(callback) {
  return (state, ...args) => {
    const event = args[args.length - 1]
    event.stopPropagation()
    event.preventDefault()
    if (typeof callback === 'function') {
      setTimeout(() => callback(...args), 0)
    }
    return state
  }
}

export function stateEvent(callback) {
  return (...args) => {
    const event = args[args.length - 1]
    event.stopPropagation()
    event.preventDefault()
    return callback(...args)
  }
}

export function stateStoreEvent(stateCallback, storeCallback) {
  return (...args) => {
    const event = args[args.length - 1]
    event.stopPropagation()
    event.preventDefault()
    if (typeof storeCallback === 'function') {
      setTimeout(() => storeCallback(...args), 0)
    }
    if (typeof stateCallback === 'function') {
      return stateCallback(...args)
    }
    return args[0]
  }
}
