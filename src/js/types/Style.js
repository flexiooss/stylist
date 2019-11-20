import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {isNull, assertType, isBoolean, isString, isArray} from '@flexio-oss/assert'
import {CssLikeBuilder} from '../CssLikeBuilder'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'
import {SelectorException} from './SelectorException'
import {TypeCheck} from '@flexio-oss/flex-types'

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
   * @param {(StyleRules, string)} value
   */
  constructor(property, value) {
    assertType(
      value instanceof globalFlexioImport.io.flexio.stylist.types.StyleRules || isString(value),
      'Item:constructor: `value` argument should be StyleRules or string if Style is registered'
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
   * @return {(StyleRules, string)}
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

/**
 * @implements {CssRulesBuilder}
 */
class FakeCssLikeBuilder {
  /**
   *
   * @param {string} selectors
   */
  constructor(selectors) {

    assertType(
      isString(selectors),
      'FakeCssLikeBuilder:constructor: `selectors` argument should be a string'
    )

    /**
     *
     * @type {string}
     * @private
     */
    this.__selectors = selectors

  }

  /**
   *
   * @param {string} selectors
   * @return {FakeCssLikeBuilder}
   */
  static selectors(selectors) {
    return new FakeCssLikeBuilder(selectors)
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
    return this.__selectors
  }

}

export class Style {

  constructor() {
    let iterator = new Iterator(this)
    let registered = false
    let selectors = new Map()

    Object.defineProperties(
      this,
      {
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
   * @param {string} token
   * @return {Style}
   */
  setToken(token) {
    assertType(
      isString(token),
      'Style:setToken: `token` arguments should be string'
    )
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
        }
      }
    )
    return this
  }

  /**
   *
   * @return {this}
   */
  registered() {
    this[__registered] = true
    deepFreezeSeal(this)
    return this
  }

  /**
   *
   * @return {boolean}
   */
  isRegistered() {
    return !!this[__registered]
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
   * @param {string[]} selectors
   * @return {(CssLikeBuilder|FakeCssLikeBuilder)}
   * @protected
   */
  _css(selectors) {
    if (!TypeCheck.isStringArray(selectors)) {
      selectors = new globalFlexioImport.io.flexio.flex_types.arrays.StringArray(...selectors)
    }
    if (this.isRegistered()) {
      if (!this[__selectors].has(selectors.join(','))) {
        throw SelectorException.NOT_REGISTERED_SELECTOR(selectors)
      }
      return FakeCssLikeBuilder.selectors(this[__selectors].get(selectors.join(',')))
    }
    return CssLikeBuilder
      .selectors(selectors)
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

  [Symbol.iterator]() {
    return this[__iterator]
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
    return style.setToken(token)
  }
}
