import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {isNull, assertType} from '@flexio-oss/assert'

const __index = Symbol('__index')
const __length = Symbol('__length')
const __iterator = Symbol('__iterator')
const __instance = Symbol('__instance')
const __keys = Symbol('__keys')

class ItemStyleRules {
  /**
   *
   * @param {string} property
   * @param {StyleRules} value
   */
  constructor(property, value) {
    assertType(
      value instanceof globalFlexioImport.io.flexio.stylist.types.StyleRules,
      'Item:constructor: `value` argument should be StyleRules'
    )

    this.__property = property
    this.__value = value
  }

  /**
   *
   * @return {string}
   */
  get property() {
    return this.__property
  }

  /**
   *
   * @return {StyleRules}
   */
  get value() {
    return this.__value
  }

}

class Iterator {
  constructor(instance) {
    this[__index] = 0
    this[__instance] = instance
    this[__keys] = null
    this[__length] = null
  }

  next() {

    this.__ensureLength()
    const iteratorStatement = this.__initIteratorReturn()

    if ((this[__index] < this[__length])) {

      iteratorStatement.value = new ItemStyleRules(
        this[__keys][this[__index]],
        this[__instance][this[__keys][this[__index]]]
      )

      iteratorStatement.done = false

      this[__index]++
      return iteratorStatement

    }

    this.__resetIterator()
    return iteratorStatement
  }

  __methods(obj) {
    let props = []

    do {
      props = props.concat(
        Object.getOwnPropertyNames(obj).filter((v) => {
          const descriptor = Object.getOwnPropertyDescriptor(obj, v)
          return !!descriptor.get
            && !!descriptor.configurable
            && v !== '__proto__'
        })
      )
    }
    while (obj = Object.getPrototypeOf(obj))

    return props
  }

  __ensureLength() {
    if (isNull(this[__length])) {
      this[__keys] = this.__methods(this[__instance])
      this[__length] = this[__keys].length
    }
  }

  /**
   *
   * @return {{value: *, done: boolean}}
   * @private
   */
  __initIteratorReturn() {
    return {
      value: null,
      done: true
    }
  }

  __resetIterator() {
    this[__index] = 0
    this[__length] = null
  }
}

export class Style {
  /**
   *
   * @param {string} token
   */
  constructor(token = '') {
    let iterator = new Iterator(this)

    Object.defineProperties(
      this,
      {
        /**
         * @property {string} Style#token
         */
        token: {
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

  [Symbol.iterator]() {
    return this[__iterator]
  }

  /**
   * @return {Object}
   */
  toObject() {
    let jsonObject = {}

    for (/**     @type {ItemStyleRules}     */    let a of this) {
      jsonObject[a.property] = a.value
    }

    return jsonObject
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject()
  }

}

export class StyleWithToken {
  /**
   *
   * @param {Style} style
   * @param {string} token
   * @return {Style}
   */
  static build(style, token) {
    assertType(
      style instanceof Style,
      'StyleWithToken:build: `style` argument should be an instance of Style'
    )
    return new style.constructor(token)
  }
}
