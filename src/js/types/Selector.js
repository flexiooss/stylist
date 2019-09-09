import {SelectorException} from './SelectorException'

export class Selector {
  /**
   *
   * @param {string} selector
   */
  constructor(selector) {
    /**
     *
     * @type {string}
     * @private
     */
    this.__selector = selector
  }

  /**
   *
   * @return {Selector}
   */
  validate() {
    if (!this.__isSingle()) {
      throw SelectorException.IS_MULTIPLE(this.__selector)
    }
    return this
  }

  /**
   *
   * @return {boolean}
   * @private
   */
  __isSingle() {
    return !RegExp('[,]').test(this.__selector)
  }

  /**
   *
   * @return {string}
   */
  get selector() {
    return this.__selector
  }
}
