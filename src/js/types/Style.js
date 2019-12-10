import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, TypeCheck as PrimitiveTypeCheck} from '@flexio-oss/assert'
import {CssLikeBuilder} from '../CssLikeBuilder'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'
import {SelectorException} from './SelectorException'
import {Selector} from './Selectors'

const __registered = Symbol('__registered')
const __selectors = Symbol('__selectors')
const __styleRulesSet = Symbol('__styleRulesSet')

export class Style {

  constructor() {
    let registered = false
    let selectors = new Map()
    let styleRulesSet = new Set()

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
         * @property {Set<StyleRules>} this#__styleRulesSet
         * @return {Set<StyleRules>}
         */
        [__styleRulesSet]: {
          configurable: false,
          enumerable: false,
          writable: false,
          value: styleRulesSet
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
    PrimitiveTypeCheck.assertIsString(token)

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
   * @param {function(styleRules: StyleRules)} callback
   */
  forEachStyles(callback) {
    this[__styleRulesSet].forEach(
      /**
       *
       * @param {StyleRules} v
       */
      v => {
        callback(v)
      })
  }

  /**
   *
   * @param {string} selector
   * @param {string} selectorTokenized
   * @return {Style}
   */
  addSelectorTokenized(selector, selectorTokenized) {
    Selector.assertSingleSelector(selector)
    Selector.assertSingleSelector(selectorTokenized)

    this[__selectors].set(selector, selectorTokenized)
    return this
  }

  /**
   *
   * @return {this}
   */
  register() {
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
   * @param {...StyleRules} styles
   * @return {this}
   * @protected
   */
  _addStyleRules(...styles) {
    PrimitiveTypeCheck.assertIsArray(styles)
    styles.forEach(v => this.__addSingleStyleRules(v))
    return this
  }

  /**
   *
   * @param {StyleRules} value
   * @return {this}
   * @private
   */
  __addSingleStyleRules(value) {
    assertType(
      value instanceof globalFlexioImport.io.flexio.stylist.types.StyleRules,
      'Style:__addSingleStyleRules: `value` arguments should be StyleRules'
    )
    this[__styleRulesSet].add(value)
    return this
  }

  /**
   *
   * @param {string[]} selectors
   * @return {CssLikeBuilder}
   * @protected
   */
  _cssBuilder(selectors) {
    return new CssLikeBuilder(selectors)
  }

  /**
   *
   * @param {string} selector
   * @return {string}
   * @protected
   */
  _selector(selector) {

    Selector.assertSingleSelector(selector)

    if (this.isRegistered()) {
      if (!this[__selectors].has(selector)) {
        throw SelectorException.NOT_REGISTERED_SELECTOR(selector)
      }
      return this[__selectors].get(selector).replace('.', '')
    }
    return selector
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
