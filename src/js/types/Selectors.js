import {SelectorException} from './SelectorException'
import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/flex-types'

export class Selectors {
  /**
   *
   * @param {StringArray} selectors
   */
  constructor(selectors) {
    assertType(
      TypeCheck.isStringArray(selectors),
      `${this.constructor.name}: 'selectors' should be StringArray`
    )
    /**
     *
     * @type {StringArray}
     * @private
     */
    this.__selectors = selectors
  }

  /**
   *
   * @return {StringArray}
   */
  get selectors() {
    return this.__selectors
  }

  joinedSelectors() {
    return this.__selectors.join(',')
  }
}
