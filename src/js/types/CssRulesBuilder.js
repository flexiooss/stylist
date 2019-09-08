/**
 * @interface
 */
export class CssRulesBuilder {

  /**
   *
   * @param {string} selector
   * @return {CssRulesBuilder}
   */
  static selector(selector) {
  }

  /**
   *
   * @param {StyleSheetMedia} styleSheetMedia
   * @param {Object.<string, string>} rules
   * @return {CssRulesBuilder}
   */
  rule(styleSheetMedia, rules) {
  }

  /**
   *
   * @return {(StyleRules,string)}
   */
  build() {
  }

}
