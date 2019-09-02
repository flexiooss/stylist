const __index = Symbol('__index')
const __token = Symbol('__token')
const __iterator = Symbol('__iterator')
const __instance = Symbol('__instance')

class iterator {
  constructor(instance) {
    this[__index] = 0
    this[__instance] = instance
  }

  next() {
    const iteratorStatement = {
      value: null,
      done: true
    }

    do {
      iteratorStatement.value = this[this[__instance].rules()[this[__index]]]()
      iteratorStatement.done = false

      this[__index]++
      return iteratorStatement

    } while (this[__index] < (this[__instance].rules().length))

    this[__index] = 0
    return iteratorStatement
  }
}

export class Style {
  /**
   *
   * @param {string} token
   */
  constructor(token) {
    let iterator = new iterator(this)

    Object.defineProperties(
      this,
      {
        [__token]: {
          configurable: false,
          enumerable: false,
          writable: false,
          value: token
        },
        [__iterator]: {
          configurable: false,
          enumerable: false,
          value: iterator
        }
      }
    )
  }

  /**
   *
   * @return {string}
   */
  token() {
    return this[__token]
  }

  /**
   *
   * @return {Array.<string>}
   */
  rules() {
    return []
  }

  [Symbol.iterator]() {
    return this[__iterator]
  }

}
