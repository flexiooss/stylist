import {assertType, isArray, isObject, isString, TypeCheck as PrimitiveTypeCheck} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
// import {Selector} from './types/Selector'
import {TypeCheck} from '@flexio-oss/flex-types'

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

/**
 * @implements {CssRulesBuilder}
 */
export class CssLikeBuilder {

  /**
   *
   * @param {string[]} selectors
   */
  constructor(selectors) {

    PrimitiveTypeCheck.assertIsArray(selectors)

    if (!TypeCheck.isStringArray(selectors)) {
      selectors = new globalFlexioImport.io.flexio.flex_types.arrays.StringArray(...selectors)
    }
    /**
     *
     * @type {StringArray}
     * @private
     */
    this.__selectors = selectors
    /**
     *
     * @type {Array.<Item>}
     * @private
     */
    this.__rules = []
  }

  /**
   *
   * @param {string[]} selectors
   * @return {CssLikeBuilder}
   */
  static selectors(selectors) {
    return new CssLikeBuilder(selectors)
  }

  /**
   *
   * @param {StyleSheetMedia} styleSheetMedia
   * @param {Object.<string, string>} rules
   * @return {CssLikeBuilder}
   */
  styleSheetMediaRules(styleSheetMedia, rules) {
    assertType(
      styleSheetMedia instanceof globalFlexioImport.io.flexio.stylist.types.StyleSheetMedia,
      'CssLikeBuilder:rule: `styleSheetMedia` argument should be an instance of StyleSheetMedia'
    )
    PrimitiveTypeCheck.assertIsObject(rules)

    this.__rules.push(new Item(styleSheetMedia, rules))
    return this
  }

  /**
   *
   * @return {StyleRules}
   */
  build() {
    return new globalFlexioImport.io.flexio.stylist.types.StyleRulesBuilder()
      .selectors(this.__selectors)
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
