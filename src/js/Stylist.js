import {StyleSheetBuilder} from './StyleSheetBuilder'

export class Stylist {
  /**
   *
   * @param {StyleSheetMediaArray} styleSheetMediaArray
   */
  constructor(styleSheetMediaArray) {
    /**
     *
     * @type {Map<string, StyleSheet>}
     * @private
     */
    this.__styleSheets = new Map()

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
   * @param {Class.<Style>} style
   * @return {Style}
   */
  register(style) {
    let token

    const inst = new style(token)
    this.__addToStyleSheet(inst)

    return inst
  }

  __addToStyleSheet(style) {
    for (let rulesSet of style) {
      this.__addRules(rulesSet)
    }
  }

  __addRules(rulesSet) {
    this.__styleSheet
      .insertRule(rulesSet.selector + '{' + propStr + '}', this.__styleSheet.cssRules.length)
  }
}
