import {RandomString} from '@flexio-oss/js-helpers'
import {isNull} from '@flexio-oss/assert'

/**
 *
 * @type {Map<string, Map<string, string>>}
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

    if (!isNull(matches) && (matches[0] !== undefined)) {

      if (!mapToken.has(styleToken)) {
        mapToken.set(styleToken, new Map())
      }
      if (!mapToken.get(styleToken).has(matches[0])) {
        mapToken.get(styleToken).set(matches[0], RandomString(4))
      }

      return selector.replace(matches[0], '._' + styleToken + '-' + mapToken.get(styleToken).get(matches[0]))
    }

    return selector

  }

}
