import {assertType, isFunction} from '@flexio-oss/assert'
import {Style, StyleWithToken} from './types/Style'
import {RandomString} from '@flexio-oss/js-helpers'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {Selector} from './types/Selectors'

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
   * @private
   */
  __addToStyleSheet() {

    this.__style.forEachStyles(
      /**
       *
       * @param {StyleRules} styleRules
       */
      (styleRules) => {

        const tokenizedSelectors = new globalFlexioImport.io.flexio.flex_types.arrays.StringArray()

        styleRules.selectors()
          .forEach(
            selector => {
              const tokenisedSelector = this.__selectorTokenizer(selector, this.__style.token)
              this.__style.addSelectorTokenized(selector, tokenisedSelector)
              tokenizedSelectors.push(tokenisedSelector)
            })

        this.__addRules(tokenizedSelectors, styleRules)

      }
    )

    this.__style.register()
    return this
  }

  /**
   *
   * @param {StringArray} tokenizedSelectors
   * @param {StyleRules} styleRules
   * @private
   */
  __addRules(tokenizedSelectors, styleRules) {

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
            `${Selector.joinedSelectors(tokenizedSelectors)} {${this.__rulesToString(mediaRules.rules())}}`,
            styleSheet.cssRules.length
          )
        }
      )

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
