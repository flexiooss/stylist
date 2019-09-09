/* global runTest */
import '../../package'
import {TestCase} from 'code-altimeter-js'
import {ColorStyle, BadStyle, BadSelectorStyle} from './TestStyle'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {isString} from '@flexio-oss/assert'
import {SelectorException} from '../js/types/SelectorException'
import {TypeCheck} from '../../src/js/TypeCheck'

const assert = require('assert')

export class StyleTest extends TestCase {

  testShouldIterateAroundGetProperties() {

    this.__iterateArround(new ColorStyle(), ['colorAlert', 'colorInfo'])
    this.__iterateArround(new BadStyle(), ['colorAlert', 'colorInfo'])

  }

  /**
   *
   * @param {Style} style
   * @param {Array} properties
   * @private
   */
  __iterateArround(style, properties) {
    for (/** @type {ItemStyleRules} */ let item of style) {
      const index = properties.indexOf(item.property)

      if (index < 0) {
        throw new Error('Not in Style')
      }
      properties.splice(index, 1)

    }

    assert(properties.length === 0)
  }

  testBadCssSelector() {
    const style = new BadSelectorStyle()

    assert.throws(
      () => {
        for (/** @type {ItemStyleRules} */ let item of style) {
          assert(TypeCheck.isStyleRules(item.value))
        }
      }
      ,
      SelectorException
    )
  }

  testIterableItemReturn() {
    const style = new ColorStyle()
    for (/** @type {ItemStyleRules} */ let item of style) {
      assert(item.value instanceof globalFlexioImport.io.flexio.stylist.types.StyleRules)

    }
  }

  testRegisteredIterableItemReturn() {
    const style = new ColorStyle()
    style.addSelector('.color-main', '.color-main')
    style.addSelector('.color-info', '.color-info')
    style.registered()

    for (/** @type {ItemStyleRules} */ let item of style) {
      assert(isString(item.value))
    }
  }

  testThrowPartialRegisteredIterableItem() {
    const style = new ColorStyle()
    style.addSelector('.color-main', '.color-main')

    style.registered()

    assert.throws(
      () => {
        for (/** @type {ItemStyleRules} */ let item of style) {
          assert(isString(item.value))
        }
      },
      SelectorException
    )
  }

  testRegisteredIsFrozen() {
    const style = new ColorStyle()

    style.registered()
    assert(Object.isFrozen(style))
    assert(Object.isSealed(style))
  }
}

runTest(StyleTest)
