import {assertType} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {FlexArray} from '@flexio-oss/flex-types'

/**
 * @extends {FlexArray<StyleSheetMedia>}
 */
export class StyleSheetMediaArray extends FlexArray {
  _validate(v) {
    assertType(v instanceof globalFlexioImport.io.flexio.stylist.types.StyleSheetMedia, 'StyleSheetMediaArray: input should be a StyleSheetMedia')
  }

  /**
   *
   * @return {Array.<Object>}
   */
  toObject() {
    return this.mapToArray(v => v.toObject())
  }
}

export class StyleSheetMediaArrayBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param { StyleSheetMedia[] } StyleSheetMedias
   * @returns {StyleSheetMediaArrayBuilder}
   */
  values(StyleSheetMedias) {
    this._values = StyleSheetMedias
    return this
  }

  /**
   * @param { StyleSheetMedia } StyleSheetMedia
   * @returns {StyleSheetMediaArrayBuilder}
   */
  pushValue(StyleSheetMedia) {
    assertType(StyleSheetMedia instanceof globalFlexioImport.io.flexio.stylist.types.StyleSheetMedia, 'StyleSheetMediaArrayBuilder:pushValue: StyleSheetMedia should be an instance of StyleSheetMedia')
    this._values.push(StyleSheetMedia)
    return this
  }

  /**
   * @returns {StyleSheetMediaArray}
   */
  build() {
    return new StyleSheetMediaArray(...this._values)
  }

  /**
   * @param {object} jsonObject
   * @returns {StyleSheetMediaArrayBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new StyleSheetMediaArrayBuilder()
    builder._values = []
    jsonObject.forEach((StyleSheetMedia) => {
      builder._values.push(globalFlexioImport.io.flexio.stylist.types.StyleSheetMediaBuilder.fromObject(StyleSheetMedia).build())
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {StyleSheetMediaArrayBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {StyleSheetMediaArray} instance
   * @returns {StyleSheetMediaArrayBuilder}
   */
  static from(instance) {
    const builder = new StyleSheetMediaArrayBuilder()
    instance.forEach((StyleSheetMedia) => {
      builder.pushValue(globalFlexioImport.io.flexio.stylist.types.StyleSheetMediaBuilder.from(StyleSheetMedia).build())
    })
    return builder
  }
}
