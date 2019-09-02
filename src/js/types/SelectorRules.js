export class SelectorRules {
  /**
   *
   * @param {StyleSheetMedia} styleSheetMedia
   * @param {RulesArray} rules
   */
  constructor(styleSheetMedia, rules) {
    this.__styleSheetMedia = styleSheetMedia
    this.__rules = rules
  }

  /**
   *
   * @return {StyleSheetMedia}
   */
  medias() {
    return this.__styleSheetMedia
  }

  /**
   * @return {RulesArray}
   */
  rules() {
    return this.__rules
  }
}
