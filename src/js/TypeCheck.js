import {StyleSheetMediaArray, StyleSheetMediaArrayBuilder} from './types/StyleSheetMediaArray'
import {Style} from './types/Style'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class TypeCheck {
  /**
   *
   * @param {Object} inst
   * @return {boolean}
   */
  static isStyleSheetMediaArray(inst) {
    return inst instanceof StyleSheetMediaArray
  }

  /**
   *
   * @param {Object} inst
   * @return {boolean}
   */
  static isStyle(inst) {
    return inst instanceof Style
  }

  /**
   *
   * @param {Object} inst
   * @return {boolean}
   */
  static isStyleRules(inst) {
    return inst instanceof globalFlexioImport.io.flexio.stylist.types.StyleRules
  }
}
