import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {isNull, assertType, isBoolean, isString} from '@flexio-oss/assert'
import {CssLikeBuilder} from '../CssLikeBuilder'

const __index = Symbol('__index')
const __length = Symbol('__length')
const __iterator = Symbol('__iterator')
const __instance = Symbol('__instance')
const __keys = Symbol('__keys')
const __registered = Symbol('__registered')
const __selectors = Symbol('__selectors')

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

export class FakeCssLikeBuilder {

  /**
   *
   * @param {string} selector
   */
  constructor(selector) {
    assertType(
      isString(selector),
      'FakeCssLikeBuilder:constructor: `selector` argument should be a string'
    )
    /**
     *
     * @type {string}
     * @private
     */
    this.__selector = selector

  }

  static selector(selector) {
    return new FakeCssLikeBuilder(selector)
  }

  /**
   *
   * @return {FakeCssLikeBuilder}
   */
  rule() {
    return this
  }

  /**
   *
   * @return {string}
   */
  build() {
    return this.__selector
  }

}

export class Style {
  /**
   *
   * @param {string} token
   */
  constructor(token = '') {
    let iterator = new Iterator(this)
    let registered = false
    let selectors = new Map()

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
        /**
         * @private
         * @property {Map<string, string>} this#__selectors
         */
        [__selectors]: {
          configurable: false,
          enumerable: false,
          writable: false,
          value: selectors
        },
        /**
         * @private
         * @property {boolean} Style#__registered
         */
        [__registered]: {
          configurable: false,
          enumerable: false,
          writable: true,
          value: registered

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
   * @return {this}
   */
  registered() {
    this[__registered] = true
    return this
  }

  /**
   *
   * @return {boolean}
   * @protected
   */
  _isRegistered() {
    return !!this[__registered]
  }

  [Symbol.iterator]() {
    return this[__iterator]
  }

  /**
   *
   * @param {string} key
   * @param {string} value
   * @return {this}
   */
  addSelector(key, value) {
    assertType(
      isString(key) && isString(value),
      'Style:addSelector: `key` and `value` arguments should be strings'
    )
    this[__selectors].set(key, value)
    return this
  }

  /**
   *
   * @param {string} selector
   * @return {(CssLikeBuilder|FakeCssLikeBuilder)}
   * @protected
   */
  _css(selector) {
    if (this._isRegistered()) {
      return FakeCssLikeBuilder.selector(this[__selectors].get(selector))
    }
    return CssLikeBuilder
      .selector(selector)
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
