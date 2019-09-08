export class AlreadyRegisteredException extends Error {
  constructor(message = '', ...params) {
    super(...params)
    this.message = message
    this.name = this.constructor.name
  }

  /**
   *
   * @return {AlreadyRegisteredException}
   */
  static STYLE_REGISTERED() {
    return new AlreadyRegisteredException('STYLE_REGISTERED : style already registered')
  }

  toString() {
    return `${this.name} : ${this.message} `
  }
}
