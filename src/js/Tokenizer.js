import {RandomString} from '@flexio-oss/js-helpers'

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
    return selector.replace(RegExp('^\\.[\\w\\d_-]+', 'gmi'), '._' + styleToken + '-' + RandomString(4))
  }

}
