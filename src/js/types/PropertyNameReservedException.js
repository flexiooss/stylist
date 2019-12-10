export class PropertyNameReservedException extends Error {
  constructor(message = '', ...params) {
    super(...params)
    this.message = message
    this.name = this.constructor.name
  }

  /**
   *
   * @param {string} propertyName
   * @return {PropertyNameReservedException}
   */
  static TOKENIZED_STYLE_RESERVED(propertyName) {
    return new PropertyNameReservedException('TOKENIZED_STYLE_RESERVED : property `' + propertyName + '` can not used into : TokenizedStyle')
  }

  toString() {
    return `${this.name} : ${this.message} `
  }
}
