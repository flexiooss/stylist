import {assertType, isFunction} from '@flexio-oss/assert'
import {Style, StyleWithToken} from './types/Style'
import {RandomString} from '@flexio-oss/js-helpers'
import {PropertyNameReservedException} from './types/PropertyNameReservedException'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class RegisterStyle {
  /**
   *
   * @param {Style} style
   * @param {Map<string, StyleSheet>} styleSheets
   * @param {function(string, string):string} selectorTokenizer
   * @private
   */
  constructor(style, styleSheets, selectorTokenizer) {
    assertType(
      style instanceof Style,
      'Stylist:register: `style` argument should be an instance of Style'
    )
    /**
     *
     * @type {Style}
     * @private
     */
    this.__style = style
    /**
     *
     * @type {Map<string, StyleSheet>}
     * @private
     */
    this.__styleSheets = styleSheets

    assertType(
      isFunction(selectorTokenizer),
      'Stylist:register: `selectorTokenizer` argument should be a function(string, string):string'
    )
    /**
     *
     * @type {function(string, string): string}
     * @private
     */
    this.__selectorTokenizer = selectorTokenizer
  }

  /**
   *
   * @param {Style} style
   * @param {Map<string, StyleSheet>} styleSheets
   * @param {function(string, string):string} selectorTokenizer
   * @return {Style}
   */
  static register(style, styleSheets, selectorTokenizer) {
    const inst = new RegisterStyle(style, styleSheets, selectorTokenizer)

    return inst.__tokenizeStyle()
      .__addToStyleSheet()
      .__style
  }

  /**
   *
   * @return {this}
   * @private
   */
  __tokenizeStyle() {
    this.__style = StyleWithToken.build(
      this.__style,
      RandomString(4)
    )
    return this
  }

  /**
   *
   * @return {this}
   * @throws {PropertyNameReservedException}
   * @private
   */
  __addToStyleSheet() {

    for (/**     @type {ItemStyleRules}     */ let item of this.__style) {
      if (['addSelector', 'setToken', 'isRegistered', 'registered', '_css', 'toObject', 'toJSON'].indexOf(item.property) > 0) {
        throw PropertyNameReservedException.TOKENIZED_STYLE_RESERVED(item.property)
      }

      this.__style.addSelector(item.value.selectors().join(','), this.__addRules(item.value))
    }
    this.__style.registered()
    return this
  }

  /**
   *
   * @param {StyleRules} styleRules
   * @return {string}
   * @private
   */
  __addRules(styleRules) {
    const selectors = new globalFlexioImport.io.flexio.flex_types.arrays.StringArray()
    for (const selector of styleRules.selectors()) {
      selectors.push(this.__selectorTokenizer(selector, this.__style.token))
    }

    const tokenizedSelectors = selectors.join(',')

    styleRules
      .rules()
      .forEach(
        /**
         *
         * @param {MediaRules} mediaRules
         */
        mediaRules => {
          const styleSheet = this.__styleSheets.get(mediaRules.media().name())

          styleSheet.insertRule(
            `${tokenizedSelectors} {${this.__rulesToString(mediaRules.rules())}}`,
            styleSheet.cssRules.length
          )
        }
      )
    return tokenizedSelectors
  }

  /**
   *
   * @param {MediaRulesRulesList} mediaRulesRulesList
   * @return {string}
   * @private
   */
  __rulesToString(mediaRulesRulesList) {
    let ret = ''
    mediaRulesRulesList.forEach(
      /**
       *
       * @param {Rule} rule
       */
      rule => {
        ret += `${rule.property()}:${rule.value()};`
      })

    return ret
  }
}
