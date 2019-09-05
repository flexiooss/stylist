import {assertType, isObject, isString} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

class Item {
  /**
   *
   * @param {StyleSheetMedia} styleSheetMedia
   * @param {Object.<string, string>} rules
   */
  constructor(styleSheetMedia, rules) {
    /**
     *
     * @type {StyleSheetMedia}
     * @private
     */
    this.__styleSheetMedia = styleSheetMedia
    /**
     *
     * @type {Object<string, string>}
     * @private
     */
    this.__rules = rules
  }

  /**
   *
   * @return {StyleSheetMedia}
   */
  get styleSheetMedia() {
    return this.__styleSheetMedia
  }

  /**
   *
   * @return {Object<string, string>}
   */
  get rules() {
    return this.__rules
  }
}

export class CssLikeBuilder {

  /**
   *
   * @param {string} selector
   */
  constructor(selector) {
    assertType(
      isString(selector),
      'CssLikeBuilder:constructor: `selector` argument should be a string'
    )
    /**
     *
     * @type {string}
     * @private
     */
    this.__selector = selector
    /**
     *
     * @type {Array.<Item>}
     * @private
     */
    this.__rules = []
  }

  static selector(selector) {
    return new CssLikeBuilder(selector)
  }

  /**
   *
   * @param {StyleSheetMedia} styleSheetMedia
   * @param {Object.<string, string>} rules
   * @return {CssLikeBuilder}
   */
  rule(styleSheetMedia, rules) {
    assertType(
      styleSheetMedia instanceof globalFlexioImport.io.flexio.stylist.types.StyleSheetMedia,
      'CssLikeBuilder:rule: `styleSheetMedia` argument should be an instance of StyleSheetMedia'
    )
    assertType(
      isObject(rules),
      'CssLikeBuilder:rule: `rules` argument should be an Object.<string, string>'
    )
    this.__rules.push(new Item(styleSheetMedia, rules))
    return this
  }

  build() {
    return new globalFlexioImport.io.flexio.stylist.types.StyleRulesBuilder()
      .selector(this.__selector)
      .rules(
        new globalFlexioImport.io.flexio.stylist.types.stylerules.StyleRulesRulesList(
          ...this.__styleRulesRulesList()
        )
      )
      .build()
  }

  /**
   * @return {Array.<MediaRules>}
   * @private
   */
  __styleRulesRulesList() {
    const ret = []
    this.__rules.forEach(
      /**
       *
       * @param {Item} item
       */
      (item) => {
        ret.push(
          new globalFlexioImport.io.flexio.stylist.types.MediaRulesBuilder()
            .media(item.styleSheetMedia)
            .rules(
              new globalFlexioImport.io.flexio.stylist.types.mediarules.MediaRulesRulesList(
                ...this.__mediaRulesRulesList(item.rules)
              )
            )
            .build()
        )
      })
    return ret
  }

  /**
   * @return {Array.<Rule>}
   * @private
   */
  __mediaRulesRulesList(rules) {
    const ret = []

    Object.keys(rules).forEach((k, i) => {
        ret.push(new globalFlexioImport.io.flexio.stylist.types.RuleBuilder()
          .property(k)
          .value(rules[k])
          .build())
      }
    )
    return ret
  }
}
