import {StyleSheetBuilder} from './StyleSheetBuilder'
import {StyleSheetMediaArray} from './types/StyleSheetMediaArray'
import {assertType, isBoolean} from '@flexio-oss/assert'
import {Style} from './types/Style'
import {Tokenizer} from './Tokenizer'
import {RegisterStyle} from './RegisterStyle'
import {LoggerInterface} from '@flexio-oss/js-logger'
import {TypeCheck} from './TypeCheck'
import {AlreadyRegisteredException} from './AlreadyRegisteredException'

const viewLogOptions = {
  color: '#da9edf',
  titleSize: 2
}

export class Stylist {
  /**
   *
   * @param {LoggerInterface} logger
   * @param {StyleSheetMediaArray} styleSheetMediaArray
   * @param {boolean} obfuscateCssClass
   */
  constructor(logger, styleSheetMediaArray, obfuscateCssClass) {
    assertType(
      logger instanceof LoggerInterface,
      'Stylist:constructor: `logger` argument should be an instance of LoggerInterface'
    )
    /**
     *
     * @type {LoggerInterface}
     * @private
     */
    this.__logger = logger

    /**
     *
     * @type {Map<string, StyleSheet>}
     * @private
     */
    this.__styleSheets = new Map()

    assertType(
      isBoolean(obfuscateCssClass), '' +
      'Stylist:constructor: `obfuscateCssClass` should be a boolean'
    )
    /**
     *
     * @type {boolean}
     * @private
     */
    this.__obfuscateCssClass = obfuscateCssClass

    assertType(
      TypeCheck.isStyleSheetMediaArray(styleSheetMediaArray),
      'Stylist:constructor: `styleSheetMediaArray` argument should be an instance of StyleSheetMediaArray'
    )
    this.__buildStyleSheets(styleSheetMediaArray)
  }

  /**
   *
   * @param {StyleSheetMediaArray} styleSheetMediaArray
   */
  __buildStyleSheets(styleSheetMediaArray) {
    styleSheetMediaArray.forEach(
      /** @param {StyleSheetMedia} styleSheetMedia */
      styleSheetMedia => {
        this.__styleSheets.set(
          styleSheetMedia.name(),
          StyleSheetBuilder.build(styleSheetMedia)
        )

        this.__logger.log(
          this.__logger.builder()
            .info()
            .pushLog(this.constructor.name + ': StyleSheet added : ' + styleSheetMedia.name())
            .pushLog(this.__styleSheets.get(styleSheetMedia.name())
            ),
          viewLogOptions
        )
      })

  }

  /**
   *
   * @param {Style} style
   * @return {Style}
   * @throws {AlreadyRegisteredException, PropertyNameReservedException}
   */
  register(style) {
    if (style.isRegistered()) {
      throw AlreadyRegisteredException.STYLE_REGISTERED()
    }

    if (this.__obfuscateCssClass) {
      return RegisterStyle.register(style, this.__styleSheets, (selector, styleToken) => {
        return Tokenizer.obfuscateSelector(selector, styleToken)
      })
    } else {
      return RegisterStyle.register(style, this.__styleSheets, (selector, styleToken) => {
        return Tokenizer.selector(selector, styleToken)
      })
    }
  }

}

export class StylistBuilder {
  constructor() {
    this.__logger = null
    this.__styleSheetMediaArray = new StyleSheetMediaArray()
    this.__obfuscateCssClass = true
  }

  /**
   *
   * @param {LoggerInterface} logger
   * @return {StylistBuilder}
   */
  logger(logger) {
    this.__logger = logger
    return this
  }

  /**
   *
   * @param {StyleSheetMediaArray} styleSheetMediaArray
   * @return {StylistBuilder}
   */
  styleSheetMediaArray(styleSheetMediaArray) {
    this.__styleSheetMediaArray = styleSheetMediaArray
    return this
  }

  /**
   *
   * @param {StyleSheetMedia} styleSheetMedia
   * @return {StylistBuilder}
   */
  addStyleSheetMedia(styleSheetMedia) {
    this.__styleSheetMediaArray.push(styleSheetMedia)
    return this
  }

  /**
   *
   * @param {boolean} value
   * @return {StylistBuilder}
   */
  obfuscateCssClass(value) {
    this.__obfuscateCssClass = value
    return this
  }

  /**
   *
   * @return {Stylist}
   */
  build() {
    return new Stylist(this.__logger, this.__styleSheetMediaArray, this.__obfuscateCssClass)
  }
}
