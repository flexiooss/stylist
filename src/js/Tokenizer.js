import {RandomString} from '@flexio-oss/js-helpers'

/**
 *
 * @type {Map<string, string>}
 */
const mapToken = new Map()

export class Tokenizer {

  /**
   * @param {string} selector
   * @param {string} styleToken
   * @return {string}
   */
  static selector(selector, styleToken) {
    return selector.replace(RegExp('^\\.', 'gmi'), '._' + styleToken + '--')

  }

  /**
   * @param {string} selector
   * @param {string} styleToken
   * @return {string}
   */
  static obfuscateSelector(selector, styleToken) {

    let matches = selector.match(new RegExp('^\\.[\\w\\d_-]+', 'gmi'))
    if (matches[0] !== undefined) {
      if (!mapToken.has(matches[0])) {
        mapToken.set(matches[0], RandomString(4))
      }

      return selector.replace(matches[0], '._' + styleToken + '-' + mapToken.get(matches[0]))
    }

    return selector

  }

}
