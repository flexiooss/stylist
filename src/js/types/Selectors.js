import {SelectorException} from './SelectorException'
import {assertType, TypeCheck as PrimitiveTypeCheck} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/flex-types'

export class Selector {

  /**
   *
   * @param {string} selector
   */
  static assertSingleSelector(selector) {
    PrimitiveTypeCheck.assertIsString(selector)
    if (RegExp('[,]').test(selector)) {
      SelectorException.IS_MULTIPLE(selector)
    }
  }

  /**
   *
   * @param {StringArray} selectors
   */
  static joinedSelectors(selectors) {
    assertType(
      TypeCheck.isStringArray(selectors),
      `'selectors' should be StringArray`
    )
    return selectors.join(',')
  }
}
