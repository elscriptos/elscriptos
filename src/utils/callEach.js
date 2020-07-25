
export default (...fns) => (...args) => fns.forEach(fn => fn(...args))
