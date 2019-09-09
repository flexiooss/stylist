export class SelectorException extends Error {
  constructor(message = '', ...params) {
    super(...params)
    this.message = message
    this.name = this.constructor.name
  }

  /**
   *
   * @param {string} selector
   * @return {SelectorException}
   */
  static NOT_REGISTERED_SELECTOR(selector) {
    return new SelectorException('NOT_REGISTERED_SELECTOR : property `' + selector + '`  not already registered')
  }

  /**
   *
   * @param {string} selector
   * @return {SelectorException}
   */
  static IS_MULTIPLE(selector) {
    return new SelectorException('IS_MULTIPLE : property `' + selector + '`  has multiple xpath selector')
  }

  toString() {
    return `${this.name} : ${this.message} `
  }
}
