import {assertType, isFunction} from '@flexio-oss/assert'
import {Style, StyleWithToken} from './types/Style'
import {RandomString} from '@flexio-oss/js-helpers'
import {TokenizedStyle} from './types/TokenizedStyle'
import {PropertyNameReservedException} from './types/PropertyNameReservedException'

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
   * @return {TokenizedStyle}
   */
  static register(style, styleSheets, selectorTokenizer) {
    const inst = new RegisterStyle(style, styleSheets, selectorTokenizer)

    return inst.__addToStyleSheet(
      inst.__tokenizeStyle(style)
    )
  }

  /**
   *
   * @param {Style} style
   * @return {Style}
   * @private
   */
  __tokenizeStyle(style) {
    return StyleWithToken.build(
      style,
      RandomString(4)
    )
  }

  /**
   *
   * @param {Style} style
   * @return {TokenizedStyle}
   * @private
   */
  __addToStyleSheet(style) {
    const tokenizedStyle = new TokenizedStyle(style)

    for (/**     @type {ItemStyleRules}     */ let item of style) {
      if (['style', 'isTypeOf'].indexOf(item.property) > 0) {
        throw PropertyNameReservedException.TOKENIZED_STYLE_RESERVED(item.property)
      }

      tokenizedStyle[item.property] = this.__addRules(style, item.value)
    }
    return tokenizedStyle
  }

  /**
   *
   * @param {Style} style
   * @param {StyleRules} styleRules
   * @return {string}
   * @private
   */
  __addRules(style, styleRules) {
    const selector = this.__selectorTokenizer(styleRules.selector(), style.token)

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
            `${selector} {${this.__rulesToString(mediaRules.rules())}}`,
            styleSheet.cssRules.length
          )
        }
      )
    return selector
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
