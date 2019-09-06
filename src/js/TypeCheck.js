import {StyleSheetMediaArray, StyleSheetMediaArrayBuilder} from './types/StyleSheetMediaArray'
import {Style} from './types/Style'

export class TypeCheck {

  static isStyleSheetMediaArray(inst) {
    return inst instanceof StyleSheetMediaArray
  }

  static isStyle(inst) {
    return inst instanceof Style
  }
}
