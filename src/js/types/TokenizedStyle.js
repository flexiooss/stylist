import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '../TypeCheck'

export class TokenizedStyle {
  /**
   *
   * @param {Style} style
   */
  constructor(style) {
    assertType(
      TypeCheck.isStyle(style),
      'TokenizedStyle:constructor: `style` argument should be an instance of Style'
    )
    this.__style = style
  }

  /**
   *
   * @return {Style}
   */
  get style() {
    return this.__style
  }

  /**
   *
   * @param {Style} style
   * @return {boolean}
   */
  isTypeOf(style) {
    return style instanceof this.__style
  }

}
