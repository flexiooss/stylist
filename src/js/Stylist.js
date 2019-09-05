import {StyleSheetBuilder} from './StyleSheetBuilder'
import {assertType} from '@flexio-oss/assert'
import {Style, StyleWithToken} from './types/Style'
import {Tokenizer} from './Tokenizer'

export class Stylist {
  /**
   *
   * @param {StyleSheetMediaArray} styleSheetMediaArray
   * @param {boolean} tokenOnly
   */
  constructor(styleSheetMediaArray, tokenOnly = true) {
    /**
     *
     * @type {Map<string, StyleSheet>}
     * @private
     */
    this.__styleSheets = new Map()
    this.__tokenOnly = tokenOnly

    this.__buildStyleSheets(styleSheetMediaArray)
  }

  /**
   *
   * @param {StyleSheetMediaArray} styleSheetMediaArray
   */
  __buildStyleSheets(styleSheetMediaArray) {
    styleSheetMediaArray.forEach(
      /** @param {StyleSheetMedia} styleSheetMedia */
      styleSheetMedia => {
        this.__styleSheets.set(
          styleSheetMedia.name(),
          StyleSheetBuilder.build(styleSheetMedia)
        )
      })
  }

  /**
   *
   * @param {Style} style
   * @return {Style}
   */
  register(style) {
    assertType(
      style instanceof Style,
      'Stylist:register: `style` argument should be an instance of Style'
    )

    const inst = StyleWithToken.build(
      style,
      Tokenizer.checksumObject(style).toString()
    )

    this.__addToStyleSheet(inst)

    return inst
  }

  /**
   *
   * @param {Style} style
   * @private
   */
  __addToStyleSheet(style) {
    for (/**     @type {Item}     */ let item of style) {
      this.__addRules(style, item.value)
    }
  }

  /**
   *
   * @param {Style} style
   * @param {StyleRules} styleRules
   * @private
   */
  __addRules(style, styleRules) {
    console.log(styleRules)

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
            `${Tokenizer.selector(style, styleRules, this.__tokenOnly)} {${this.__rulesToString(mediaRules.rules())}}`,
            styleSheet.cssRules.length
          )
          console.log(styleSheet)
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
