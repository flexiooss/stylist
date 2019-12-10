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

  testRegisteredIsFrozen() {
    const style = new ColorStyle()

    style.register()
    assert(Object.isFrozen(style))
    assert(Object.isSealed(style))
  }
}

runTest(StyleTest)
