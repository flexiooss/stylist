export class Tokenizer {
  /**
   *
   * @param {string} text
   * @return {number}
   */
  static checksum(text) {
    let hash = 0, strlen = text.length, i, c
    if (strlen === 0) {
      return hash
    }
    for (i = 0; i < strlen; i++) {
      c = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + c
      hash = hash & hash
    }
    return hash
  }

  /**
   *
   * @param {Object} object
   * @return {number}
   */
  static checksumObject(object) {
    console.log(JSON.stringify(object))
    console.log(Tokenizer.checksum(JSON.stringify(object)))

    return Tokenizer.checksum(JSON.stringify(object))
  }

  /**
   * @param {Style} style
   * @param {StyleRules} styleRules
   * @param {boolean} tokenOnly
   * @return {string}
   */
  static selector(style, styleRules, tokenOnly) {
    let selector = styleRules.selector()
    if (tokenOnly) {
      return '._' + style.token
    }
    return selector.replace('.', '._' + style.token + '-')

  }

}
