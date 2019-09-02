import {isNull} from '@flexio-oss/assert'

export class StyleSheetBuilder {
  /**
   * @private
   * @param {StyleSheetMedia} styleSheetMedia
   */
  constructor(styleSheetMedia) {
    this.__element = document.createElement('style')
    /**
     *
     * @type {StyleSheetMedia}
     * @private
     */
    this.__styleSheetMedia = styleSheetMedia
  }

  /**
   *
   * @param {StyleSheetMedia} styleSheetMedia
   * @return {StyleSheet}
   */
  static build(styleSheetMedia) {
    const inst = new StyleSheetBuilder(styleSheetMedia)
    inst.__buildMedia()
    return document.head.appendChild(inst.__element).sheet
  }

  __buildMedia() {
    if (!isNull(this.__styleSheetMedia)) {
      this.__styleSheetMedia
        .medias()
        .forEach(value => {
          this.__element.setAttribute('media', value)
        })
    }
  }
}